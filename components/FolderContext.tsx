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
import type { LinkFolder } from "./data";

type FolderContextValue = {
  folders: LinkFolder[];
  isAddingFolder: boolean;
  addFolder: (name: string) => Promise<LinkFolder | null>;
  removeFolder: (id: string) => Promise<boolean>;
  renameFolder: (id: string, name: string) => Promise<boolean>;
};

const FolderContext = createContext<FolderContextValue | null>(null);

type FolderProviderProps = {
  children: ReactNode;
};

export function FolderProvider({ children }: FolderProviderProps) {
  const [folders, setFolders] = useState<LinkFolder[]>([]);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const isAddingRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("folders")
      .select("id, name")
      .order("id", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("폴더 목록을 불러오지 못했습니다:", error.message);
          return;
        }

        setFolders((data ?? []).map((row) => ({ id: String(row.id), name: row.name })));
      });
  }, []);

  const addFolder = useCallback(async (name: string) => {
    if (isAddingRef.current) return null;
    isAddingRef.current = true;
    setIsAddingFolder(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("folders")
        .insert({ name })
        .select("id, name")
        .single();

      if (error || !data) {
        console.error("폴더를 추가하지 못했습니다:", error?.message);
        return null;
      }

      const newFolder: LinkFolder = { id: String(data.id), name: data.name };
      setFolders((prev) => [...prev, newFolder]);
      return newFolder;
    } finally {
      isAddingRef.current = false;
      setIsAddingFolder(false);
    }
  }, []);

  const removeFolder = useCallback(async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("folders").delete().eq("id", id);

    if (error) {
      console.error("폴더를 삭제하지 못했습니다:", error.message);
      return false;
    }

    setFolders((prev) => prev.filter((folder) => folder.id !== id));
    return true;
  }, []);

  const renameFolder = useCallback(async (id: string, name: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("folders").update({ name }).eq("id", id);

    if (error) {
      console.error("폴더 이름을 수정하지 못했습니다:", error.message);
      return false;
    }

    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name } : folder)),
    );
    return true;
  }, []);

  const value = useMemo(
    () => ({ folders, isAddingFolder, addFolder, removeFolder, renameFolder }),
    [folders, isAddingFolder, addFolder, removeFolder, renameFolder],
  );

  return <FolderContext.Provider value={value}>{children}</FolderContext.Provider>;
}

export function useFolders() {
  const context = useContext(FolderContext);

  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }

  return context;
}
