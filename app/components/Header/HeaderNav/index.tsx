import {useLocation} from '@remix-run/react';
import HeaderNavLink from './HeaderNavLink';

const HeaderNav = () => {
    const location = useLocation();
    const isEnglish = location.pathname.startsWith('/en');

    return (
        <nav className="flex items-center gap-4 sm:gap-6">
            <HeaderNavLink to={isEnglish ? '/' : '/en'}>
                {isEnglish ? '日本語' : 'EN'}
            </HeaderNavLink>
        </nav>
    );
};

export default HeaderNav;
