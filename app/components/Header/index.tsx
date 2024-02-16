import type {FC} from 'react';
import {twJoin} from 'tailwind-merge';
import ReactJapanLogo from '~/components/ReactJapanLogo';
import RemixLogo from '~/components/RemixLogo';

type HeaderProps = {
    className?: string;
};

const Header: FC<HeaderProps> = ({className}) => (
    <header
        className={twJoin(
            'flex w-full items-center gap-4 px-6 py-4 text-white',
            className
        )}
    >
        <ReactJapanLogo />
        <RemixLogo height={18} />
    </header>
);

export default Header;
