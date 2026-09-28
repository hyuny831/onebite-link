import type { Metadata } from "next";
import LoginView from "@/components/LoginView";

export const metadata: Metadata = {
  title: "로그인",
  description: "OneBite Link에 로그인하고 나만의 링크를 폴더별로 관리해보세요.",
};

export default function LoginPage() {
  return <LoginView />;
}
