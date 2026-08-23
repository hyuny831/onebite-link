"use client";

import { useEffect } from "react";
import type { LinkFolder } from "./data";

type DeleteFolderModalProps = {
  folder: LinkFolder | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteFolderModal({ folder, onCancel, onConfirm }: DeleteFolderModalProps) {
  useEffect(() => {
    if (!folder) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [folder, onCancel]);

  if (!folder) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-folder-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
      >
        <h2
          id="delete-folder-title"
          className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-50"
        >
          폴더를 삭제할까요?
        </h2>
        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">‘{folder.name}’</span>{" "}
          폴더를 삭제하면 되돌릴 수 없어요.
        </p>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
