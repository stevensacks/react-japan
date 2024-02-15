import type {FC} from 'react';
import {twJoin} from 'tailwind-merge';

type HeaderProps = {
    className?: string;
};

const Header: FC<HeaderProps> = ({className}) => (
    <header className={twJoin('w-full bg-grey-50 p-4', className)}>
        <h1 className="text-3xl font-bold">React Japan</h1>
    </header>
);

export default Header;
