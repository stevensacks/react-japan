export type Maybe<T> = T | null | undefined;

export type Author = {
    href?: string;
    image: string;
    name: string;
    nameKana?: string;
    role?: string;
};

export type ArticleMeta = {
    author: Author;
    date: string;
    description: string;
    sourceUrl?: string;
    title: string;
    to?: string;
};
