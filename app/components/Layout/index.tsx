import type {FC, ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';
import Header from '~/components/Header';

type LayoutProps = {
  children: ReactNode;
  className?: string;
  hideLocaleSwitcher?: boolean;
};

const Layout: FC<LayoutProps> = ({children, className, hideLocaleSwitcher}) => (
  <>
    <Header hideLocaleSwitcher={hideLocaleSwitcher} />
    <main className={twMerge('px-4 py-6 sm:px-6', className)}>{children}</main>
  </>
);

export default Layout;
