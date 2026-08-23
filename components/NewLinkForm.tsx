"use client";

import { useState, type FormEvent } from "react";
import { folders } from "./data";

export default function NewLinkForm() {
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: 실제 저장 로직 연동
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

        <button
          type="submit"
          className="mt-2 flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          저장
        </button>
      </form>
    </div>
  );
}
