"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "./FolderContext";
import { useLinks } from "./LinkContext";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();

  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "오픈그래프 정보를 가져오지 못했어요.");
      }

      addLink({
        url: data.url || url,
        title: data.title || url,
        description: data.description || "",
        thumbnail: data.thumbnail || undefined,
        folderId,
      });

      router.push(folderId ? `/folder/${folderId}` : "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "링크를 저장하지 못했어요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg px-6 py-12">
      <h1 className="mb-6 text-lg font-bold text-zinc-900 dark:text-zinc-50">새 링크 추가</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="link-url"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            링크 주소
          </label>
          <input
            id="link-url"
            type="url"
            required
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="link-folder"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            폴더
          </label>
          <select
            id="link-folder"
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

        {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {isSubmitting ? "가져오는 중..." : "확인"}
        </button>
      </form>
    </div>
  );
}
