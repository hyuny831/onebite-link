"use client";

import AppShell from "./AppShell";
import LinkGrid from "./LinkGrid";
import { useFolders } from "./FolderContext";
import { useLinks } from "./LinkContext";

export default function HomeView() {
  const { folders } = useFolders();
  const { links } = useLinks();

  return (
    <AppShell>
      <LinkGrid links={links} folders={folders} />
    </AppShell>
  );
}
