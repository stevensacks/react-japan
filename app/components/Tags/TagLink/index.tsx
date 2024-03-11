import type {FC} from 'react';
import type {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faReact} from '@fortawesome/free-brands-svg-icons';
import {faCode, faServer} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {twJoin} from 'tailwind-merge';
import RemixR from '~/components/RemixR';
import type {Tag} from '~/types';

const ICONS: Record<string, IconProp> = {
    devops: faServer,
    react: faReact,
    workflow: faCode,
};

type TagLinkProps = {
    className?: string;
    tag: Tag;
};

const TagLink: FC<TagLinkProps> = ({className, tag}) => (
    <div
        className={twJoin(
            'flex items-center gap-1.5 rounded-full border border-grey-100 bg-grey-50 px-2.5 py-1 text-xs text-grey-500 dark:border-grey-700 dark:bg-grey-800 dark:text-grey-300',
            className
        )}
    >
        {tag.slug === 'remix' ?
            <RemixR className="-mr-px ml-px" height={7} width={7} />
        :   ICONS[tag.slug] && (
                <FontAwesomeIcon icon={ICONS[tag.slug]} size="xs" />
            )
        }
        <span>{tag.name}</span>
    </div>
);

export default TagLink;
