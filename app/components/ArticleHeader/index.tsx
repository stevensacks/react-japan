import type {FC} from 'react';
import {useMatches} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';
import type {ArticleMeta} from '~/types';

type ArticleHeaderProps = {
    meta: ArticleMeta;
};

const ArticleHeader: FC<ArticleHeaderProps> = ({
    meta: {author, date, sourceUrl, title},
}) => {
    const matches = useMatches();
    // @ts-ignore
    const linkToParent = matches[1]?.handle?.breadcrumb;

    return (
        <header className="not-prose space-y-6">
            {linkToParent?.()}
            <div className="flex items-center gap-4">
                <img
                    alt={author.name}
                    className={twJoin(
                        'rounded-full border border-grey-300 dark:border-grey-500',
                        sourceUrl ? 'size-14' : 'size-12'
                    )}
                    src={author.image}
                />
                <div className="pt-0.5 leading-none">
                    <div className="font-semibold text-grey-700 dark:text-grey-200">
                        {author.name}
                    </div>
                    <time className="text-sm text-grey-600 dark:text-grey-400">
                        {date}
                    </time>
                    {sourceUrl && (
                        <a
                            className="block text-xs"
                            href={sourceUrl}
                            rel="noreferrer"
                            target="_blank"
                        >
                            ソース英語記事
                        </a>
                    )}
                </div>
            </div>
            <h1 className="mb-0 text-lg font-bold sm:text-2xl md:text-4xl">
                {title}
            </h1>
        </header>
    );
};

export default ArticleHeader;
