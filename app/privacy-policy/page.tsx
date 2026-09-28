import type { Metadata } from "next";
import PrivacyPolicyView from "@/components/PrivacyPolicyView";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "OneBite Link의 개인정보 수집 및 이용에 관한 안내입니다.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}
