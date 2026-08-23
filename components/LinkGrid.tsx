"use client";

import { useState } from "react";
import type { LinkFolder, LinkItem } from "./data";
import LinkCard from "./LinkCard";
import DeleteLinkModal from "./DeleteLinkModal";
import EditLinkModal from "./EditLinkModal";
import { useLinks } from "./LinkContext";

type LinkGridProps = {
  links: LinkItem[];
  folders: LinkFolder[];
};

export default function LinkGrid({ links, folders }: LinkGridProps) {
  const { removeLink } = useLinks();
  const [linkToDelete, setLinkToDelete] = useState<LinkItem | null>(null);
  const [linkToEdit, setLinkToEdit] = useState<LinkItem | null>(null);

  const handleConfirmDelete = () => {
    if (!linkToDelete) return;
    removeLink(linkToDelete.id);
    setLinkToDelete(null);
  };

  if (links.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 py-24 text-center text-zinc-400 dark:text-zinc-500">
        <p className="text-3xl">🔖</p>
        <p className="text-sm">등록된 링크가 없어요.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          folderName={folders.find((folder) => folder.id === link.folderId)?.name}
          onEdit={() => setLinkToEdit(link)}
          onDelete={() => setLinkToDelete(link)}
        />
      ))}

      <EditLinkModal link={linkToEdit} onClose={() => setLinkToEdit(null)} />

      <DeleteLinkModal
        link={linkToDelete}
        onCancel={() => setLinkToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
