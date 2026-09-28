import type { Metadata } from "next";
import ResetPasswordView from "@/components/ResetPasswordView";

export const metadata: Metadata = {
  title: "비밀번호 재설정",
  description: "새로운 비밀번호를 설정해주세요.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordView />;
}
