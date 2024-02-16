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
        <main>{children}</main>
    </div>
);

export default Layout;
