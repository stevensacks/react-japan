import type {FC} from 'react';
import {Link} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';
import AuthorBlock from '~/components/AuthorBlock';
import Tags from '~/components/Tags';
import type {ArticleMeta} from '~/types';

type ArticleCardProps = {
    className?: string;
    meta: ArticleMeta;
};

const ArticleCard: FC<ArticleCardProps> = ({
    className,
    meta: {author, date, description, image, tags, title, to},
}) => (
    <Link
        className={twJoin('plain-link group block space-y-3', className)}
        prefetch="intent"
        to={to}
    >
        {image && (
            <figure className="overflow-hidden rounded-lg border border-grey-100 dark:border-grey-800">
                <img alt={title} className="aspect-[16/9]" src={image} />
            </figure>
        )}
        <div className="flex flex-wrap items-center gap-2">
            <time className="text-xs text-grey-500 dark:text-grey-300">
                {date}
            </time>
            {tags && <Tags className="-mt-0.5" tags={tags} />}
        </div>
        <h2 className="text-pretty text-lg font-semibold leading-tight transition-colors duration-200 group-hover:text-red-500 dark:group-hover:text-red-500">
            {title}
        </h2>
        <p className="text-pretty text-sm text-grey-600 dark:text-grey-200">
            {description}
        </p>
        <AuthorBlock
            image={author.image}
            name={author.name}
            nameKana={author.nameKana}
            noResize={true}
            role={author.role}
        />
    </Link>
);

export default ArticleCard;
