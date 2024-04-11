export type Maybe<T> = T | null | undefined;

export type Author = {
  id: number;
  image: string;
  name: string;
  nameKana?: string;
  role?: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
};

export type ArticleMeta = {
  author: Author;
  date: string;
  excerpt: string;
  featured?: boolean;
  hero: string;
  id: number;
  locale: string;
  slug: string;
  sourceUrl?: string;
  tags?: Array<Tag>;
  title: string;
};

export type Article = ArticleMeta & {
  content: string;
};
