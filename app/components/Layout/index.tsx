import type {FC, ReactNode} from 'react';
import {twJoin} from 'tailwind-merge';
import Header from '~/components/Header';

type LayoutProps = {
    children: ReactNode;
    className?: string;
};

const Layout: FC<LayoutProps> = ({children, className}) => (
    <div className={twJoin(className)}>
        <Header />
        <main className="px-2 py-6 sm:px-6">{children}</main>
    </div>
);

export default Layout;
