import type {FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from '@remix-run/react';

type ReactJapanLogoProps = {
    className?: string;
};

const ReactJapanLogo: FC<ReactJapanLogoProps> = () => (
    <Link
        className="plain-link inline-flex select-none items-center gap-2 font-bold sm:text-2xl"
        to="/"
    >
        <FontAwesomeIcon className="text-red-700" icon={['fab', 'react']} />
        <span className="text-grey-900 dark:text-grey-100">React Japan</span>
    </Link>
);

export default ReactJapanLogo;
