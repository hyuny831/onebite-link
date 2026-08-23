"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LinkFolder } from "./data";

type SidebarProps = {
  folders: LinkFolder[];
  linkCountByFolder: Record<string, number>;
  totalLinkCount: number;
};

export default function Sidebar({ folders, linkCountByFolder, totalLinkCount }: SidebarProps) {
  const pathname = usePathname();

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
        />
      ))}
    </aside>
  );
}

type SidebarLinkProps = {
  href: string;
  icon: string;
  label: string;
  count: number;
  active: boolean;
};

function SidebarLink({ href, icon, label, count, active }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
      }`}
    >
      <span className="flex items-center gap-2">
        <span aria-hidden="true">{icon}</span>
        {label}
      </span>
      <span
        className={`text-xs ${
          active ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400 dark:text-zinc-500"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}
