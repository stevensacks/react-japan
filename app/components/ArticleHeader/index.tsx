import type {FC} from 'react';
import {twJoin} from 'tailwind-merge';
import type {ArticleMeta} from '~/types';

type ArticleHeaderProps = {
    className?: string;
    meta: ArticleMeta;
};

const ArticleHeader: FC<ArticleHeaderProps> = ({
    className,
    meta: {author, date, image, title},
}) => (
    <header className={twJoin('relative', className)}>
        <div className="overflow-hidden rounded-lg">
            <figure>
                <img alt={title} src={image} />
            </figure>
            <div className="absolute inset-0 flex flex-col bg-grey-900/70 p-4 text-white md:p-8">
                <div className="flex-1">
                    <time className="text-sm text-white/70 sm:text-base">
                        {date}
                    </time>
                    <h1 className="text-lg font-bold sm:text-2xl md:text-4xl">
                        {title}
                    </h1>
                </div>
                <div className="flex flex-1 items-end">
                    <div className="flex items-center gap-4">
                        <div>
                            <img
                                alt={author.name}
                                className="m-0 size-8 sm:size-12 md:size-16"
                                src={author.image}
                            />
                        </div>
                        <div>
                            <div className="text-lg font-bold leading-none sm:text-xl sm:leading-tight md:text-3xl">
                                {author.name}
                            </div>
                            <div className="leading-none text-white/50 sm:leading-tight">
                                {author.role}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default ArticleHeader;
