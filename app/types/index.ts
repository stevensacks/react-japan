export type Author = {
    image: string;
    name: string;
    role: string;
};

export type ArticleMeta = {
    author: Author;
    date: string;
    description: string;
    image: string;
    title: string;
};
