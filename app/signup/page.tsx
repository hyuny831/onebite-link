import type { Metadata } from "next";
import SignupView from "@/components/SignupView";

export const metadata: Metadata = {
  title: "회원가입",
  description: "OneBite Link 회원가입하고 나만의 링크 보관함을 만들어보세요.",
};

export default function SignupPage() {
  return <SignupView />;
}
