import type {FC} from 'react';
import {twJoin} from 'tailwind-merge';
import ArticleCard from '~/components/ArticleCard';
import FeaturedArticleCard from '~/components/FeaturedArticleCard';
import type {ArticleMeta} from '~/types';

type ArticlesGridProps = {
    articles: Array<ArticleMeta>;
    className?: string;
    isFeatured?: boolean;
};

const ArticlesGrid: FC<ArticlesGridProps> = ({
    articles,
    className,
    isFeatured,
}) => (
    <div
        className={twJoin(
            'grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3',
            className
        )}
    >
        {articles.map((meta) =>
            isFeatured ?
                <FeaturedArticleCard key={meta.title} meta={meta} />
            :   <ArticleCard key={meta.title} meta={meta} />
        )}
    </div>
);

export default ArticlesGrid;
