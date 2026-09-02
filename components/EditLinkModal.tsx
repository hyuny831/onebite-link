"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { LinkItem } from "./data";
import { useFolders } from "./FolderContext";
import { useLinks } from "./LinkContext";

type EditLinkModalProps = {
  link: LinkItem | null;
  onClose: () => void;
};

export default function EditLinkModal({ link, onClose }: EditLinkModalProps) {
  if (!link) {
    return null;
  }

  // Keyed by link.id so the fields reset to the current link's values
  // whenever a different link is opened for editing.
  return <EditLinkModalContent key={link.id} link={link} onClose={onClose} />;
}

type EditLinkModalContentProps = {
  link: LinkItem;
  onClose: () => void;
};

function EditLinkModalContent({ link, onClose }: EditLinkModalContentProps) {
  const { folders } = useFolders();
  const { updateLink } = useLinks();

  const [folderId, setFolderId] = useState(link.folderId);
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);

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

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const success = await updateLink(link.id, {
      folderId,
      title: trimmedTitle,
      description: description.trim(),
    });
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
        aria-labelledby="edit-link-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
      >
        <h2 id="edit-link-title" className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-50">
          링크 정보 수정
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-link-folder"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              폴더
            </label>
            <select
              id="edit-link-folder"
              value={folderId}
              onChange={(event) => setFolderId(event.target.value)}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
            >
              <option value="">폴더 선택 안 함</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-link-name"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              제목
            </label>
            <input
              id="edit-link-name"
              type="text"
              required
              autoFocus
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="링크 제목을 입력하세요"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-link-description"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              설명
            </label>
            <textarea
              id="edit-link-description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="링크 설명을 입력하세요"
              className="resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
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
