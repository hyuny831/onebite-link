import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type OpenGraphData = {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
};

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "url 쿼리 파라미터가 필요해요." }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error("invalid protocol");
    }
  } catch {
    return NextResponse.json({ error: "올바른 링크 주소가 아니에요." }, { status: 400 });
  }

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OneBiteLinkBot/1.0; +https://onebite.link)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`요청이 실패했어요. (${response.status})`);
    }

    const html = await response.text();
    const finalUrl = response.url || parsedUrl.toString();

    const title =
      extractMetaContent(html, "og:title") ?? extractTitleTag(html) ?? parsedUrl.hostname;

    const description =
      extractMetaContent(html, "og:description") ?? extractMetaContent(html, "description") ?? "";

    const rawThumbnail =
      extractMetaContent(html, "og:image") ?? extractMetaContent(html, "twitter:image") ?? "";

    const canonicalUrl = extractMetaContent(html, "og:url");

    const data: OpenGraphData = {
      title: decodeHtmlEntities(title).trim(),
      description: decodeHtmlEntities(description).trim(),
      thumbnail: resolveUrl(rawThumbnail, finalUrl),
      url: canonicalUrl ? resolveUrl(canonicalUrl, finalUrl) || parsedUrl.toString() : parsedUrl.toString(),
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `오픈그래프 정보를 가져오지 못했어요. (${error.message})`
            : "오픈그래프 정보를 가져오지 못했어요.",
      },
      { status: 502 },
    );
  }
}

function extractMetaContent(html: string, key: string): string | undefined {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${escapedKey}["'][^>]*content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${escapedKey}["']`, "i"),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }

  return undefined;
}

function extractTitleTag(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1];
}

function resolveUrl(value: string, base: string): string {
  if (!value) return "";
  try {
    return new URL(value, base).toString();
  } catch {
    return "";
  }
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'");
}
