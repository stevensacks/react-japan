import type {FC, ReactNode} from 'react';
import {twJoin} from 'tailwind-merge';
import ArticleHeader from '~/components/ArticleHeader';
import type {ArticleMeta} from '~/types';

type ArticleProps = {
    children: ReactNode;
    className?: string;
    meta: ArticleMeta;
};

const Article: FC<ArticleProps> = ({children, className, meta}) => (
    <article
        className={twJoin(
            'container prose prose-invert mx-auto p-4 pt-0 sm:prose-lg sm:px-0',
            'prose-li:my-1',
            'prose-code:mx-1 prose-code:rounded-sm prose-code:bg-grey-800 prose-code:px-1 prose-code:py-px prose-code:text-sm prose-code:font-normal prose-code:text-grey-300 prose-code:before:content-[""] prose-code:after:content-[""]',
            'prose-pre:rounded-md prose-pre:bg-grey-800 prose-pre:p-4 prose-pre:text-grey-300',
            className
        )}
    >
        <ArticleHeader meta={meta} />
        {children}
    </article>
);

export default Article;
