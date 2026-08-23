import type { LinkItem } from "./data";

const ACCENT_COLORS = [
  "bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
  "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  "bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
];

type LinkCardProps = {
  link: LinkItem;
  folderName?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function LinkCard({ link, folderName, onEdit, onDelete }: LinkCardProps) {
  const hostname = getHostname(link.url);
  const accent = ACCENT_COLORS[hashString(link.id) % ACCENT_COLORS.length];
  const hasActions = Boolean(onEdit || onDelete);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
    >
      {hasActions && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {onEdit && (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onEdit();
              }}
              aria-label={`${link.title} 링크 수정`}
              className="rounded-md bg-white/90 p-1.5 text-zinc-400 shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-900/90 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onDelete();
              }}
              aria-label={`${link.title} 링크 삭제`}
              className="rounded-md bg-white/90 p-1.5 text-zinc-400 shadow-sm hover:bg-zinc-100 hover:text-red-500 dark:bg-zinc-900/90 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-red-400"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {link.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={link.thumbnail}
          alt=""
          className="-mx-4 -mt-4 h-32 w-[calc(100%+2rem)] max-w-none object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${accent}`}
          >
            {hostname.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {link.title}
            </h3>
            <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">{hostname}</p>
          </div>
        </div>
        <span className="shrink-0 text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600">
          ↗
        </span>
      </div>

      <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{link.description}</p>

      <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
        {folderName && (
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-900">
            {folderName}
          </span>
        )}
        <span>{link.createdAt}</span>
      </div>
    </a>
  );
}

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
