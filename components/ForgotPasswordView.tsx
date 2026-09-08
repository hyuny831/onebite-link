"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Toast from "./Toast";

function toKoreanResetError(message: string) {
  if (message.includes("Unable to validate email") || message.includes("invalid format")) {
    return "올바른 이메일 형식이 아니에요.";
  }
  if (message.includes("rate limit")) {
    return "잠시 후 다시 시도해주세요.";
  }
  return "비밀번호 재설정 메일 발송에 실패했어요. 잠시 후 다시 시도해주세요.";
}

export default function ForgotPasswordView() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const isFormFilled = email !== "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !isFormFilled) return;

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setToastMessage(toKoreanResetError(error.message));
        return;
      }

      setIsSent(true);
    } catch {
      setToastMessage("비밀번호 재설정 메일 발송에 실패했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6">
      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />

      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          <span className="text-2xl">🔗</span>
          OneBite Link
        </div>

        {isSent ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium text-zinc-900 dark:text-zinc-50">{email}</span>
              (으)로 비밀번호 재설정 링크를 보냈어요.
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              메일함을 확인하고 링크를 클릭해 비밀번호를 재설정해주세요.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
              가입하신 이메일을 입력하시면 비밀번호 재설정 링크를 보내드려요.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="forgot-password-email"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  이메일
                </label>
                <input
                  id="forgot-password-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
                />
              </div>

              <button
                type="submit"
                disabled={!isFormFilled || isSubmitting}
                className="mt-2 flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {isSubmitting ? "발송하는 중..." : "재설정 링크 보내기"}
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <Link
            href="/login"
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
          >
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
