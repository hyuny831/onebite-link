"use client";

import { useState } from "react";
import Link from "next/link";
import NewFolderModal from "./NewFolderModal";

export default function Header() {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white/80 px-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
      >
        <span className="text-xl">🔗</span>
        OneBite Link
      </Link>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsFolderModalOpen(true)}
          className="flex items-center gap-1 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          <span className="text-base leading-none">+</span>
          새 폴더
        </button>

        <Link
          href="/new"
          className="flex items-center gap-1 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          <span className="text-base leading-none">+</span>
          새 링크
        </Link>
      </div>

      <NewFolderModal open={isFolderModalOpen} onClose={() => setIsFolderModalOpen(false)} />
    </header>
  );
}
