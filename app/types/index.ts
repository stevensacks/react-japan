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

type StrapiAuthor = {
  data: {
    attributes: Omit<Author, 'id'>;
    id: number;
  };
};

type StrapiTag = {
  attributes: Omit<Tag, 'id'>;
  id: number;
};

export type StrapiArticle = {
  attributes: Omit<Article, 'author' | 'id' | 'tags'> & {
    author: StrapiAuthor;
    tags: {data: Array<StrapiTag>};
    updatedAt: string;
  };
  id: number;
};

export type ArticleEntry = {
  slug: string;
  updatedAt: string;
};
