import type {FC} from 'react';
import DarkModeToggle from '~/components/DarkModeToggle';
import LocaleSwitcher from '~/components/Header/LocaleSwitcher';

type HeaderNavProps = {
  hideLocaleSwitcher?: boolean;
};

const HeaderNav: FC<HeaderNavProps> = ({hideLocaleSwitcher}) => (
  <nav className="flex items-center gap-4">
    {!hideLocaleSwitcher && <LocaleSwitcher />}
    <DarkModeToggle />
  </nav>
);

export default HeaderNav;
