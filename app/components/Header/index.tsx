import type {FC} from 'react';
import {Link} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';
import HeaderNav from '~/components/Header/HeaderNav';
import ReactJapanLogo from '~/components/ReactJapanLogo';

type HeaderProps = {
    className?: string;
};

const Header: FC<HeaderProps> = ({className}) => (
    <header
        className={twJoin(
            'sticky top-0 z-50 flex w-full items-center justify-between gap-4 px-4 py-2 sm:px-6 md:py-2',
            'bg-gradient-to-b from-white to-transparent dark:from-grey-900',
            className
        )}
    >
        <Link
            className="plain-link inline-flex select-none items-center gap-2 font-bold sm:text-2xl"
            to="/"
        >
            <ReactJapanLogo className="w-36" />
        </Link>
        <HeaderNav />
    </header>
);

export default Header;
