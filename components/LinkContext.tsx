"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { links as initialLinks, type LinkItem } from "./data";

type NewLinkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
  folderId: string;
};

type LinkContextValue = {
  links: LinkItem[];
  addLink: (input: NewLinkInput) => LinkItem;
  removeLink: (id: string) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

type LinkProviderProps = {
  children: ReactNode;
};

export function LinkProvider({ children }: LinkProviderProps) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  const addLink = (input: NewLinkInput) => {
    const newLink: LinkItem = {
      id: `link-${Date.now()}`,
      title: input.title,
      url: input.url,
      description: input.description,
      thumbnail: input.thumbnail,
      folderId: input.folderId,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setLinks((prev) => [newLink, ...prev]);
    return newLink;
  };

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const value = useMemo(() => ({ links, addLink, removeLink }), [links]);

  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
}

export function useLinks() {
  const context = useContext(LinkContext);

  if (!context) {
    throw new Error("useLinks must be used within a LinkProvider");
  }

  return context;
}
