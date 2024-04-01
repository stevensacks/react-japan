import type {FC} from 'react';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {twMerge} from 'tailwind-merge';
import {useTheme} from '~/state/theme';

type DarkModeToggleProps = {
  className?: string;
};

const DarkModeToggle: FC<DarkModeToggleProps> = ({className}) => {
  const [theme, setTheme] = useTheme();

  const onChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      className={twMerge(
        'relative flex size-8 items-center justify-center rounded-full',
        theme === 'dark' ?
          'bg-grey-900 text-white hover:bg-white/5'
        : 'bg-white text-grey-900 hover:bg-black/5',
        className
      )}
      onClick={onChange}
      type="button"
    >
      {theme === 'dark' ?
        <FontAwesomeIcon icon={faMoon} size="sm" transform={{rotate: -20}} />
      : <FontAwesomeIcon icon={faSun} size="sm" />}
    </button>
  );
};

export default DarkModeToggle;
