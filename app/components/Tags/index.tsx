import type {FC} from 'react';
import {twJoin} from 'tailwind-merge';
import type {Tag} from '~/types';
import TagLink from './TagLink';

type TagsProps = {
  className?: string;
  tags: Array<Tag>;
};

const Tags: FC<TagsProps> = ({className, tags}) => (
  <div className={twJoin('flex gap-2', className)}>
    {tags.map((tag) => (
      <TagLink key={tag.id} tag={tag} />
    ))}
  </div>
);

export default Tags;
