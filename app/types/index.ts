export type ArticleMeta = {
    author: {
        image: string;
        name: string;
        role: string;
    };
    date: string;
    description: string;
    image: string;
    title: string;
};

export type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
