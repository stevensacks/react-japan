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
            'sticky top-0 z-50 flex w-full items-center justify-between gap-4 border-b border-grey-700 bg-grey-900 p-2 sm:px-6 md:py-4',
            className
        )}
    >
        <ReactJapanLogo />
        <HeaderNav />
    </header>
);

export default Header;
