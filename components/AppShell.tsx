"use client";

import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useFolders } from "./FolderContext";
import { links } from "./data";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const { folders } = useFolders();

  const linkCountByFolder = links.reduce<Record<string, number>>((acc, link) => {
    acc[link.folderId] = (acc[link.folderId] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          folders={folders}
          linkCountByFolder={linkCountByFolder}
          totalLinkCount={links.length}
        />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
