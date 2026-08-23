"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { LinkFolder } from "./data";
import { useFolders } from "./FolderContext";
import DeleteFolderModal from "./DeleteFolderModal";

type SidebarProps = {
  folders: LinkFolder[];
  linkCountByFolder: Record<string, number>;
  totalLinkCount: number;
};

export default function Sidebar({ folders, linkCountByFolder, totalLinkCount }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { removeFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<LinkFolder | null>(null);

  const handleConfirmDelete = () => {
    if (!folderToDelete) return;

    const isViewingDeletedFolder = pathname === `/folder/${folderToDelete.id}`;
    removeFolder(folderToDelete.id);
    setFolderToDelete(null);

    if (isViewingDeletedFolder) {
      router.push("/");
    }
  };

  return (
    <aside className="hidden w-56 shrink-0 flex-col gap-1 border-r border-zinc-200 px-3 py-6 sm:flex dark:border-zinc-800">
      <SidebarLink
        href="/"
        icon="🗂️"
        label="All"
        count={totalLinkCount}
        active={pathname === "/"}
      />

      <p className="mt-6 mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        폴더
      </p>

      {folders.map((folder) => (
        <SidebarLink
          key={folder.id}
          href={`/folder/${folder.id}`}
          icon="📁"
          label={folder.name}
          count={linkCountByFolder[folder.id] ?? 0}
          active={pathname === `/folder/${folder.id}`}
          onDelete={() => setFolderToDelete(folder)}
        />
      ))}

      <DeleteFolderModal
        folder={folderToDelete}
        onCancel={() => setFolderToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </aside>
  );
}

type SidebarLinkProps = {
  href: string;
  icon: string;
  label: string;
  count: number;
  active: boolean;
  onDelete?: () => void;
};

function SidebarLink({ href, icon, label, count, active, onDelete }: SidebarLinkProps) {
  return (
    <div className="group relative">
      <Link
        href={href}
        className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          active
            ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
            : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span aria-hidden="true">{icon}</span>
          <span className="truncate">{label}</span>
        </span>
        <span
          className={`shrink-0 text-xs ${onDelete ? "group-hover:opacity-0" : ""} ${
            active ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400 dark:text-zinc-500"
          }`}
        >
          {count}
        </span>
      </Link>

      {onDelete && (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onDelete();
          }}
          aria-label={`${label} 폴더 삭제`}
          className={`absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 ${
            active
              ? "text-zinc-300 hover:bg-white/10 hover:text-white dark:text-zinc-600 dark:hover:bg-black/10"
              : "text-zinc-400 hover:bg-zinc-200 hover:text-red-500 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-red-400"
          }`}
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
