"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { folders as initialFolders, type LinkFolder } from "./data";

type FolderContextValue = {
  folders: LinkFolder[];
  addFolder: (name: string) => LinkFolder;
};

const FolderContext = createContext<FolderContextValue | null>(null);

type FolderProviderProps = {
  children: ReactNode;
};

export function FolderProvider({ children }: FolderProviderProps) {
  const [folders, setFolders] = useState<LinkFolder[]>(initialFolders);

  const addFolder = (name: string) => {
    const newFolder: LinkFolder = {
      id: `folder-${Date.now()}`,
      name,
    };
    setFolders((prev) => [...prev, newFolder]);
    return newFolder;
  };

  const value = useMemo(() => ({ folders, addFolder }), [folders]);

  return <FolderContext.Provider value={value}>{children}</FolderContext.Provider>;
}

export function useFolders() {
  const context = useContext(FolderContext);

  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }

  return context;
}
