import type {FC} from 'react';
import {Link} from '@remix-run/react';

type ReactJapanLogoProps = {
    className?: string;
};

const ReactJapanLogo: FC<ReactJapanLogoProps> = () => (
    <Link
        className="inline-flex select-none items-center gap-2 text-2xl font-bold"
        to="/"
    >
        <svg
            className="h-6 text-[#BC002D]"
            viewBox="-11.5 -10.23174 23 20.46348"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>React Logo</title>
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
