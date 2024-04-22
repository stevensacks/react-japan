import type {FC} from 'react';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {twJoin, twMerge} from 'tailwind-merge';
import type {Author} from '~/types';

type AuthorBlockProps = {
  author: Author;
  className?: string;
  github?: string;
  linkedin?: string;
  locale?: string;
};

const AuthorBlock: FC<AuthorBlockProps> = ({
  author: {image, name, nameKana, role},
  className,
  github,
  linkedin,
  locale,
}) => (
  <div className={twMerge('flex items-center gap-3', className)}>
    <div className="overflow-hidden rounded-full border border-grey-100 dark:border-grey-800">
      <img alt={name} className="m-0 size-8" src={image} />
    </div>
    <div className={twJoin('space-y-1')}>
      <div className={twJoin('text-sm font-semibold leading-none')}>
        <span>{locale === 'ja' && nameKana ? nameKana : name}</span>
      </div>
      <div
        className={twJoin(
          'text-xs leading-none text-grey-600 dark:text-grey-400'
        )}
      >
        {role}
      </div>
    </div>
    {(github || linkedin) && (
      <div className="flex items-center gap-4">
        {github && (
          <a aria-label="GitHub" href={github} rel="noreferrer" target="_blank">
            <FontAwesomeIcon
              className="text-grey-900 hover:text-red-500 dark:text-white dark:hover:text-red-500"
              icon={faGithub}
              size="xl"
            />
          </a>
        )}
        {linkedin && (
          <a
            aria-label="LinkedIn"
            href={linkedin}
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon
              className="text-grey-900 hover:text-red-500 dark:text-white dark:hover:text-red-500"
              icon={faLinkedin}
              size="xl"
            />
          </a>
        )}
      </div>
    )}
  </div>
);

export default AuthorBlock;
