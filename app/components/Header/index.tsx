import type {FC} from 'react';
import {Link, useLocation} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';
import HeaderNav from '~/components/Header/HeaderNav';
import ReactJapanLogo from '~/components/ReactJapanLogo';
import styles from './styles.module.css';

type HeaderProps = {
    className?: string;
    hideLocaleSwitcher?: boolean;
};

const Header: FC<HeaderProps> = ({className, hideLocaleSwitcher}) => {
    const location = useLocation();
    const isEnglish = location.pathname.startsWith('/en');

    return (
        <header
            className={twJoin(
                'sticky top-0 z-50 flex w-full items-center justify-between gap-4 px-4 py-2 sm:px-6 md:py-2',
                styles.background,
                className
            )}
        >
            <Link
                className="plain-link inline-flex select-none items-center gap-2 font-bold sm:text-2xl"
                prefetch="intent"
                to={isEnglish ? '/en' : '/'}
            >
                <ReactJapanLogo className="w-36" />
            </Link>
            <HeaderNav hideLocaleSwitcher={hideLocaleSwitcher} />
        </header>
    );
};

export default Header;
