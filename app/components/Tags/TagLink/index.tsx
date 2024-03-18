import type {FC} from 'react';
import {twJoin} from 'tailwind-merge';
import type {Tag} from '~/types';

type TagLinkProps = {
    className?: string;
    tag: Tag;
};

const TagLink: FC<TagLinkProps> = ({className, tag}) => (
    <div
        className={twJoin(
            'flex items-center rounded-full border border-grey-100 bg-grey-50 px-2.5 py-1 text-xs text-grey-500 dark:border-grey-700 dark:bg-grey-800 dark:text-grey-300',
            className
        )}
    >
        {tag.name}
    </div>
);

export default TagLink;
