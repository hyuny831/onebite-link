"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import type { LinkItem } from "./data";

type NewLinkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
  folderId: string;
};

type LinkUpdateInput = {
  folderId: string;
  title: string;
  description: string;
};

type LinkContextValue = {
  links: LinkItem[];
  isAddingLink: boolean;
  addLink: (input: NewLinkInput) => Promise<LinkItem | null>;
  removeLink: (id: string) => void;
  updateLink: (id: string, input: LinkUpdateInput) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

type LinkProviderProps = {
  children: ReactNode;
};

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  created_at: string;
  folder_id: number | null;
};

function toLinkItem(row: LinkRow): LinkItem {
  return {
    id: String(row.id),
    title: row.title ?? row.url,
    url: row.url,
    description: row.description ?? "",
    thumbnail: row.thumbnail_url ?? undefined,
    folderId: row.folder_id != null ? String(row.folder_id) : "",
    createdAt: row.created_at.slice(0, 10),
  };
}

export function LinkProvider({ children }: LinkProviderProps) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const isAddingRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, created_at, folder_id")
      .order("id", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("링크 목록을 불러오지 못했습니다:", error.message);
          return;
        }

        setLinks((data ?? []).map(toLinkItem));
      });
  }, []);

  const addLink = useCallback(async (input: NewLinkInput) => {
    if (isAddingRef.current) return null;
    isAddingRef.current = true;
    setIsAddingLink(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("links")
        .insert({
          url: input.url,
          title: input.title,
          description: input.description,
          thumbnail_url: input.thumbnail ?? null,
          folder_id: input.folderId ? Number(input.folderId) : null,
        })
        .select("id, url, title, description, thumbnail_url, created_at, folder_id")
        .single();

      if (error || !data) {
        console.error("링크를 추가하지 못했습니다:", error?.message);
        return null;
      }

      const newLink = toLinkItem(data);
      setLinks((prev) => [newLink, ...prev]);
      return newLink;
    } finally {
      isAddingRef.current = false;
      setIsAddingLink(false);
    }
  }, []);

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const updateLink = (id: string, input: LinkUpdateInput) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id
          ? {
              ...link,
              folderId: input.folderId,
              title: input.title,
              description: input.description,
            }
          : link,
      ),
    );
  };

  const value = useMemo(
    () => ({ links, isAddingLink, addLink, removeLink, updateLink }),
    [links, isAddingLink, addLink],
  );

  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
}

export function useLinks() {
  const context = useContext(LinkContext);

  if (!context) {
    throw new Error("useLinks must be used within a LinkProvider");
  }

  return context;
}
