import type { Metadata } from "next";
import NewLinkView from "@/components/NewLinkView";

export const metadata: Metadata = {
  title: "새 링크 추가",
  description: "새로운 링크를 폴더에 저장해보세요.",
};

export default function NewLinkPage() {
  return <NewLinkView />;
}
