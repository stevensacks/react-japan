import type {FC} from 'react';
import {Link} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';
import type {ArticleMeta} from '~/types';

type FeaturedArticleCardProps = {
  article: ArticleMeta;
  className?: string;
};

const FeaturedArticleCard: FC<FeaturedArticleCardProps> = ({
  article: {author, date, hero, slug, title},
  className,
}) => (
  <Link
    className={twJoin(
      'plain-link group relative flex flex-col justify-end gap-2 overflow-hidden rounded-lg border border-grey-100 px-4 pb-4 pt-80 dark:border-grey-800',
      className
    )}
    prefetch="intent"
    to={`/blog/${slug}`}
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
        <img alt={author.name} className="m-0 size-6" src={author.image} />
      </div>
      <div>{author.name}</div>
    </div>
    <h2 className="text-pretty text-lg font-semibold leading-tight text-white transition-colors duration-200 group-hover:text-red-500 dark:group-hover:text-red-500">
      {title}
    </h2>
  </Link>
);

export default FeaturedArticleCard;
