import type {FC} from 'react';
import type {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faReact} from '@fortawesome/free-brands-svg-icons';
import {faCode, faServer} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {twJoin} from 'tailwind-merge';
import RemixR from '~/components/RemixR';

const ICONS: Record<string, IconProp> = {
    DevOps: faServer,
    React: faReact,
    Workflow: faCode,
};

type TagProps = {
    className?: string;
    tag: string;
};

const Tag: FC<TagProps> = ({className, tag}) => (
    <div
        className={twJoin(
            'flex items-center gap-1.5 rounded-full border border-grey-100 bg-grey-50 px-2.5 py-1 text-xs text-grey-500 dark:border-grey-700 dark:bg-grey-800 dark:text-grey-300',
            className
        )}
    >
        {tag === 'Remix' ?
            <RemixR className="-mr-px ml-px" height={7} width={7} />
        :   ICONS[tag] && <FontAwesomeIcon icon={ICONS[tag]} size="xs" />}
        <span>{tag}</span>
    </div>
);

export default Tag;
