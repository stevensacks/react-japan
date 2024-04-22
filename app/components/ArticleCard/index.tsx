import type {FC} from 'react';
import {Link} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';
import AuthorBlock from '~/components/AuthorBlock';
import Tags from '~/components/Tags';
import type {ArticleMeta} from '~/types';

type ArticleCardProps = {
  article: ArticleMeta;
  className?: string;
};

const ArticleCard: FC<ArticleCardProps> = ({
  article: {author, date, excerpt, hero, locale, slug, tags, title},
  className,
}) => (
  <article className={twJoin('space-y-3', className)}>
    {hero && (
      <figure className="overflow-hidden rounded-lg border border-grey-100 dark:border-grey-800">
        <img alt={title} className="aspect-[16/9]" src={hero} />
      </figure>
    )}
    <div className="flex flex-wrap items-center gap-2">
      <time className="text-xs text-grey-500 dark:text-grey-300">{date}</time>
      {tags && <Tags className="-mt-0.5" tags={tags} />}
    </div>
    <Link
      className="plain-link block text-pretty text-lg font-semibold leading-tight transition-colors duration-200 hover:text-red-500 dark:hover:text-red-500"
      prefetch="intent"
      to={`/${locale === 'en' ? 'en/' : ''}blog/${slug}`}
    >
      {title}
    </Link>
    <p className="text-pretty text-sm text-grey-600 dark:text-grey-200">
      {excerpt}
    </p>
    <AuthorBlock author={author} locale={locale} />
  </article>
);

export default ArticleCard;
