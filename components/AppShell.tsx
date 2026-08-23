import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { folders, links } from "./data";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const linkCountByFolder = links.reduce<Record<string, number>>((acc, link) => {
    acc[link.folderId] = (acc[link.folderId] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
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
