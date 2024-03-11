import type {Article, Author, Tag} from '~/types';

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

type StrapiArticle = {
    attributes: Omit<Article, 'author' | 'id' | 'tags'> & {
        author: StrapiAuthor;
        tags: {data: Array<StrapiTag>};
    };
    id: number;
};

export const parseArticle = (article: StrapiArticle): Article => ({
    author: {
        id: article.attributes.author.data.id,
        image: article.attributes.author.data.attributes.image,
        name: article.attributes.author.data.attributes.name,
        nameKana: article.attributes.author.data.attributes.nameKana,
        role: article.attributes.author.data.attributes.role,
    },
    content: article.attributes.content,
    date: article.attributes.date,
    excerpt: article.attributes.excerpt,
    hero: article.attributes.hero,
    id: article.id,
    slug: article.attributes.slug,
    sourceUrl: article.attributes.sourceUrl,
    tags: article.attributes.tags.data?.map((tag) => ({
        id: tag.id,
        name: tag.attributes.name,
        slug: tag.attributes.slug,
    })),
    title: article.attributes.title,
});

export const parseArticles = (articles: Array<StrapiArticle>): Array<Article> =>
    articles.map(parseArticle);
