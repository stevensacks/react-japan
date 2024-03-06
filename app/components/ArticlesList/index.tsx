import type {FC} from 'react';
import {twJoin} from 'tailwind-merge';
import ArticlesListItem from '~/components/ArticlesList/ArticlesListItem';
import type {ArticleMeta} from '~/types';

type ArticlesListProps = {
    articles: Array<ArticleMeta>;
    className?: string;
};

const ArticlesList: FC<ArticlesListProps> = ({articles, className}) => (
    <ul className={twJoin('space-y-10', className)}>
        {articles.map((meta) => (
            <li key={meta.title}>
                <ArticlesListItem meta={meta} />
            </li>
        ))}
    </ul>
);

export default ArticlesList;
