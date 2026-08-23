"use client";

import { notFound } from "next/navigation";
import AppShell from "./AppShell";
import LinkGrid from "./LinkGrid";
import { useFolders } from "./FolderContext";
import { useLinks } from "./LinkContext";

type FolderViewProps = {
  folderId: string;
};

export default function FolderView({ folderId }: FolderViewProps) {
  const { folders } = useFolders();
  const { links } = useLinks();

  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    notFound();
  }

  const folderLinks = links.filter((link) => link.folderId === folderId);

  return (
    <AppShell>
      <LinkGrid links={folderLinks} folders={folders} />
    </AppShell>
  );
}
