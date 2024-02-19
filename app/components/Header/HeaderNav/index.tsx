import {useLocation} from '@remix-run/react';
import DarkModeToggle from '~/components/DarkModeToggle';
import HeaderNavLink from './HeaderNavLink';

const HeaderNav = () => {
    const location = useLocation();
    const isEnglish = location.pathname.startsWith('/en');

    return (
        <nav className="flex items-center gap-4">
            <HeaderNavLink
                className="font-semibold"
                to={isEnglish ? '/' : '/en'}
            >
                {isEnglish ? '日本語' : 'EN'}
            </HeaderNavLink>
            <DarkModeToggle />
        </nav>
    );
};

export default HeaderNav;
