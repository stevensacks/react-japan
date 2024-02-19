import type {FC} from 'react';
import {NavLink} from '@remix-run/react';
import type {RemixNavLinkProps} from '@remix-run/react/dist/components';
import {twJoin} from 'tailwind-merge';

type HeaderNavLinkProps = RemixNavLinkProps & {
    className?: string;
};

const HeaderNavLink: FC<HeaderNavLinkProps> = ({
    children,
    className,
    ...props
}) => (
    <NavLink
        className={({isActive}) =>
            twJoin(
                'plain-link text-sm sm:text-base',
                isActive ? 'text-red-700' : 'text-grey-900 dark:text-grey-100',
                className
            )
        }
        prefetch="intent"
        {...props}
    >
        {children}
    </NavLink>
);

export default HeaderNavLink;
