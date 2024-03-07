import type {FC} from 'react';
import {twJoin} from 'tailwind-merge';
import Tag from './Tag';

type TagsProps = {
    className?: string;
    tags: Array<string>;
};

const Tags: FC<TagsProps> = ({className, tags}) => (
    <div className={twJoin('flex gap-2', className)}>
        {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
        ))}
    </div>
);

export default Tags;
