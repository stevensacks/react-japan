import type {FC, ReactNode} from 'react';
import {twJoin} from 'tailwind-merge';
import ArticleHeader from '~/components/ArticleHeader';
import type {Article} from '~/types';

type ArticleBlockProps = {
  article: Article;
  children?: ReactNode;
  className?: string;
};

const ArticleBlock: FC<ArticleBlockProps> = ({
  article,
  children,
  className,
}) => (
  <article
    className={twJoin(
      'container mx-auto p-4 pt-0 sm:px-0',
      'prose dark:prose-invert',
      'prose-h1:font-semibold prose-h2:font-semibold prose-h3:font-semibold prose-h4:font-semibold',
      'prose-li:my-1',
      'prose-pre:rounded-md prose-pre:px-3 prose-pre:py-4',
      'prose-code:mx-1 prose-code:rounded-sm prose-code:px-1 prose-code:py-px prose-code:text-sm prose-code:font-normal prose-code:before:content-[""] prose-code:after:content-[""]',
      'prose-headings:scroll-mt-16 sm:prose-headings:scroll-mt-20',
      'prose-img:border prose-img:border-grey-100 dark:prose-img:border-grey-800',
      className
    )}
  >
    <ArticleHeader article={article} />
    <div dangerouslySetInnerHTML={{__html: article.content}} />
    {children}
  </article>
);

export default ArticleBlock;
