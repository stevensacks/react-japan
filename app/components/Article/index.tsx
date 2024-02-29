import type {FC, ReactNode} from 'react';
import {twJoin} from 'tailwind-merge';
import ArticleHeader from '~/components/ArticleHeader';
import type {ArticleMeta} from '~/types';

type ArticleProps = {
    children: ReactNode;
    className?: string;
    meta?: ArticleMeta;
};

const Article: FC<ArticleProps> = ({children, className, meta}) => (
    <article
        className={twJoin(
            'container mx-auto p-4 pt-0 sm:px-0',
            'prose dark:prose-invert',
            'prose-h1:font-semibold prose-h2:font-semibold prose-h3:font-semibold prose-h4:font-semibold',
            'prose-li:my-1',
            'prose-code:mx-1 prose-code:rounded-sm prose-code:px-1 prose-code:py-px prose-code:text-sm prose-code:font-normal prose-code:before:content-[""] prose-code:after:content-[""]',
            'prose-pre:rounded-md prose-pre:p-4',
            'prose-code:bg-grey-100 prose-code:text-grey-800 prose-pre:bg-grey-100 prose-pre:text-grey-800',
            'dark:prose-code:bg-grey-800 dark:prose-code:text-grey-200 dark:prose-pre:bg-grey-800 dark:prose-pre:text-grey-200',
            'prose-headings:scroll-mt-16 sm:prose-headings:scroll-mt-20',
            'prose-img:border prose-img:border-grey-100 dark:prose-img:border-grey-800',
            className
        )}
    >
        {meta && <ArticleHeader meta={meta} />}
        {children}
    </article>
);

export default Article;
