import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient(await cookies());

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // next는 절대 URL 또는 상대 경로로 올 수 있어 origin을 기준으로 안전하게 해석한다.
      const destination = new URL(next, origin);
      if (destination.origin !== origin) {
        // 다른 출처로의 리다이렉트는 오픈 리다이렉트 방지를 위해 허용하지 않는다.
        destination.href = origin;
      }
      return NextResponse.redirect(destination);
    }
  }

  return NextResponse.redirect(new URL("/login", origin));
}
