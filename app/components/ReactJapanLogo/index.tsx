import type {FC} from 'react';
import {Link} from '@remix-run/react';

type ReactJapanLogoProps = {
    className?: string;
};

const ReactJapanLogo: FC<ReactJapanLogoProps> = () => (
    <Link
        className="plain-link inline-flex select-none items-center gap-2 font-bold sm:text-2xl"
        to="/"
    >
        <svg
            className="h-4 text-red-700 sm:h-6"
            viewBox="-11.5 -10.23174 23 20.46348"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title className="whitespace-nowrap">React Japan</title>
            <circle cx="0" cy="0" fill="currentColor" r="2.05" />
            <g fill="none" stroke="currentColor" strokeWidth="1">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
        </svg>
        <span>React Japan</span>
    </Link>
);

export default ReactJapanLogo;
