import type {FC} from 'react';
import {Link} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';
import type {ArticleMeta} from '~/types';

type FeaturedArticleCardProps = {
  article: ArticleMeta;
  className?: string;
};

const FeaturedArticleCard: FC<FeaturedArticleCardProps> = ({
  article: {author, date, hero, locale, slug, title},
  className,
}) => (
  <article
    className={twJoin(
      'relative flex flex-col justify-end gap-2 overflow-hidden rounded-lg border border-grey-100 px-4 pb-4 pt-80 dark:border-grey-800',
      className
    )}
  >
    <img
      alt={title}
      className="absolute inset-0 -z-10 size-full object-cover"
      src={hero}
    />
    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black to-60%" />
    <div className="flex flex-wrap items-center gap-2 text-sm text-white">
      <time>{date}</time>
      <div className="text-grey-300">•</div>
      <div className="overflow-hidden rounded-full border border-grey-600">
        <img
          alt={
            locale === 'ja' && author.nameKana ? author.nameKana : author.name
          }
          className="m-0 size-6"
          src={author.image}
        />
      </div>
      <div>
        {locale === 'ja' && author.nameKana ? author.nameKana : author.name}
      </div>
    </div>
    <Link
      className="plain-link block text-pretty text-lg font-semibold leading-tight text-white transition-colors duration-200 hover:text-red-500 dark:hover:text-red-500"
      prefetch="intent"
      to={`/${locale === 'en' ? 'en/' : ''}blog/${slug}`}
    >
      {title}
    </Link>
  </article>
);

export default FeaturedArticleCard;
