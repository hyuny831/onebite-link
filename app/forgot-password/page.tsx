import type { Metadata } from "next";
import ForgotPasswordView from "@/components/ForgotPasswordView";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
  description: "가입한 이메일로 비밀번호 재설정 링크를 받아보세요.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
