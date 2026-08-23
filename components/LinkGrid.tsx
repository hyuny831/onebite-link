import type { LinkFolder, LinkItem } from "./data";
import LinkCard from "./LinkCard";

type LinkGridProps = {
  links: LinkItem[];
  folders: LinkFolder[];
};

export default function LinkGrid({ links, folders }: LinkGridProps) {
  if (links.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 py-24 text-center text-zinc-400 dark:text-zinc-500">
        <p className="text-3xl">🔖</p>
        <p className="text-sm">등록된 링크가 없어요.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          folderName={folders.find((folder) => folder.id === link.folderId)?.name}
        />
      ))}
    </div>
  );
}
