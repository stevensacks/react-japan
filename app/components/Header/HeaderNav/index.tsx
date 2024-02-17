import {NavLink} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';
import RemixLogo from '~/components/RemixLogo';
import HeaderNavLink from './HeaderNavLink';

const HeaderNav = () => (
    <nav className="flex items-center gap-4 sm:gap-6">
        <HeaderNavLink to="/blog">Blog</HeaderNavLink>
        <HeaderNavLink to="/about">About</HeaderNavLink>
        <NavLink
            className={({isActive}) =>
                twJoin(
                    'plain-link',
                    isActive ? 'text-red-700' : 'text-grey-100'
                )
            }
            to="/remix"
        >
            <RemixLogo className="h-3" />
        </NavLink>
    </nav>
);

export default HeaderNav;
