"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { LinkFolder } from "./data";
import { useFolders } from "./FolderContext";

type EditFolderModalProps = {
  folder: LinkFolder | null;
  onClose: () => void;
};

export default function EditFolderModal({ folder, onClose }: EditFolderModalProps) {
  if (!folder) {
    return null;
  }

  // Keyed by folder.id so the input resets to the current folder's name
  // whenever a different folder is opened for editing.
  return <EditFolderModalContent key={folder.id} folder={folder} onClose={onClose} />;
}

type EditFolderModalContentProps = {
  folder: LinkFolder;
  onClose: () => void;
};

function EditFolderModalContent({ folder, onClose }: EditFolderModalContentProps) {
  const { renameFolder } = useFolders();
  const [name, setName] = useState(folder.name);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) return;

    const success = await renameFolder(folder.id, trimmed);
    if (!success) return;

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-folder-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
      >
        <h2
          id="edit-folder-title"
          className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-50"
        >
          폴더 이름 수정
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-folder-name"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              폴더 이름
            </label>
            <input
              id="edit-folder-name"
              type="text"
              required
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="폴더 이름을 입력하세요"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
