"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Toast from "./Toast";

function toKoreanResetPasswordError(message: string) {
  if (message.includes("Password should be at least")) {
    return "비밀번호는 6자 이상이어야 해요.";
  }
  return "비밀번호 재설정에 실패했어요. 잠시 후 다시 시도해주세요.";
}

export default function ResetPasswordView() {
  const router = useRouter();

  const [isVerifying, setIsVerifying] = useState(true);
  const [hasValidSession, setHasValidSession] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isFormFilled = password !== "" && passwordConfirm !== "";

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setHasValidSession(Boolean(user));
      setIsVerifying(false);
    };

    checkSession();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !isFormFilled) return;

    if (password !== passwordConfirm) {
      setToastMessage("비밀번호가 일치하지 않아요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setToastMessage(toKoreanResetPasswordError(error.message));
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setToastMessage("비밀번호 재설정에 실패했어요. 잠시 후 다시 시도해주세요.");
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

        {isVerifying ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">확인하는 중...</p>
        ) : !hasValidSession ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              링크가 만료되었거나 올바르지 않아요.
            </p>
            <Link
              href="/forgot-password"
              className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
            >
              비밀번호 재설정 다시 요청하기
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="reset-password-new"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                새 비밀번호
              </label>
              <input
                id="reset-password-new"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="새 비밀번호를 입력하세요"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="reset-password-confirm"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                새 비밀번호 확인
              </label>
              <input
                id="reset-password-confirm"
                type="password"
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                placeholder="새 비밀번호를 다시 입력하세요"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
              />
            </div>

            <button
              type="submit"
              disabled={!isFormFilled || isSubmitting}
              className="mt-2 flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {isSubmitting ? "재설정하는 중..." : "비밀번호 재설정"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
