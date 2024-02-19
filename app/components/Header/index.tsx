import type {FC} from 'react';
import {twJoin} from 'tailwind-merge';
import HeaderNav from '~/components/Header/HeaderNav';
import ReactJapanLogo from '~/components/ReactJapanLogo';

type HeaderProps = {
    className?: string;
};

const Header: FC<HeaderProps> = ({className}) => (
    <header
        className={twJoin(
            'sticky top-0 z-50 flex w-full items-center justify-between gap-4 border-b border-grey-100 bg-white p-2 shadow-sm dark:border-grey-800 dark:bg-grey-900 sm:px-6 md:py-4',
            className
        )}
    >
        <ReactJapanLogo />
        <HeaderNav />
    </header>
);

export default Header;
