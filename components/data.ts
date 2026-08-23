export type LinkFolder = {
  id: string;
  name: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
  folderId: string;
  createdAt: string;
};

export const folders: LinkFolder[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "article", name: "아티클" },
  { id: "shopping", name: "쇼핑" },
];

export const links: LinkItem[] = [
  {
    id: "1",
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    description: "Next.js의 공식 문서로, App Router와 최신 기능들을 확인할 수 있어요.",
    folderId: "dev",
    createdAt: "2026-08-20",
  },
  {
    id: "2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 클래스 기반의 CSS 프레임워크 공식 사이트.",
    folderId: "dev",
    createdAt: "2026-08-19",
  },
  {
    id: "3",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "전 세계 디자이너들의 작업물을 구경할 수 있는 커뮤니티.",
    folderId: "design",
    createdAt: "2026-08-18",
  },
  {
    id: "4",
    title: "Figma",
    url: "https://figma.com",
    description: "협업이 가능한 UI/UX 디자인 툴.",
    folderId: "design",
    createdAt: "2026-08-17",
  },
  {
    id: "5",
    title: "당근마켓 시즌 세일",
    url: "https://www.daangn.com",
    description: "동네 이웃과 중고거래를 할 수 있는 서비스.",
    folderId: "shopping",
    createdAt: "2026-08-15",
  },
  {
    id: "6",
    title: "이번 주 읽을만한 아티클 모음",
    url: "https://example.com/articles",
    description: "개발과 디자인을 아우르는 이번 주의 추천 아티클 모음집.",
    folderId: "article",
    createdAt: "2026-08-14",
  },
];
