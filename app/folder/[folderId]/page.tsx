import type { Metadata } from "next";
import FolderView from "@/components/FolderView";

type FolderPageProps = {
  params: Promise<{ folderId: string }>;
};

export const metadata: Metadata = {
  title: "폴더",
  description: "폴더에 모아둔 링크를 확인해보세요.",
};

export default async function FolderPage({ params }: FolderPageProps) {
  const { folderId } = await params;

  return <FolderView folderId={folderId} />;
}
