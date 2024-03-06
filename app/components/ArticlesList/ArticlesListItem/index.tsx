import type {FC} from 'react';
import {Link} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';
import AuthorBlock from '~/components/AuthorBlock';
import type {ArticleMeta} from '~/types';

type ArticlesListItemProps = {
    className?: string;
    meta: ArticleMeta;
};

const ArticlesListItem: FC<ArticlesListItemProps> = ({
    className,
    meta: {author, date, description, title, to},
}) => (
    <Link
        className={twJoin('plain-link group block space-y-3', className)}
        prefetch="intent"
        to={to as string}
    >
        <time className="text-sm text-grey-500 dark:text-grey-400">{date}</time>
        <h2 className="text-pretty text-lg font-semibold leading-tight group-hover:text-red-500 dark:group-hover:text-red-500">
            {title}
        </h2>
        <p className="text-pretty text-sm text-grey-600 group-hover:text-black dark:text-grey-200 dark:group-hover:text-white">
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

export default ArticlesListItem;
