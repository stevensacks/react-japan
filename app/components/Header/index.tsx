import type {FC} from 'react';
import {twJoin} from 'tailwind-merge';

type HeaderProps = {
    className?: string;
};

const Header: FC<HeaderProps> = ({className}) => (
    <header className={twJoin('w-full bg-black p-4 text-white', className)}>
        <h1 className="text-3xl font-bold">React Japan</h1>
    </header>
);

export default Header;
