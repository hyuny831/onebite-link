import { type EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = createClient(await cookies());

    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      // next는 절대 URL(예: http://localhost:3000/reset-password) 또는
      // 상대 경로(예: /reset-password)로 올 수 있어 origin을 기준으로 안전하게 해석한다.
      const destination = new URL(next, origin);
      if (destination.origin !== origin) {
        // 다른 출처로의 리다이렉트는 오픈 리다이렉트 방지를 위해 허용하지 않는다.
        destination.href = origin;
      }
      return NextResponse.redirect(destination);
    }
  }

  return NextResponse.redirect(new URL("/forgot-password", origin));
}
