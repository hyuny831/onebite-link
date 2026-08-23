import type { Metadata } from "next";
import { FolderProvider } from "@/components/FolderContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneBite Link",
  description: "나만의 링크를 폴더별로 모아두는 링크 보관함",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <FolderProvider>{children}</FolderProvider>
      </body>
    </html>
  );
}
