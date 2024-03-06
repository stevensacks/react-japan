import type {FC, ReactNode} from 'react';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {twJoin, twMerge} from 'tailwind-merge';

type AuthorBlockProps = {
    className?: string;
    github?: string;
    image: string;
    linkedin?: string;
    name: string;
    nameKana?: string;
    noResize?: boolean;
    role: ReactNode;
};

const AuthorBlock: FC<AuthorBlockProps> = ({
    className,
    github,
    image,
    linkedin,
    name,
    nameKana,
    noResize,
    role,
}) => (
    <div
        className={twMerge(
            'flex items-center gap-3',
            !noResize && 'sm:gap-4',
            className
        )}
    >
        <div className="overflow-hidden rounded-full border border-grey-300 dark:border-grey-800">
            <img
                alt={name}
                className={twJoin(
                    'm-0 size-8',
                    !noResize && 'sm:size-12 md:size-16'
                )}
                src={image}
            />
        </div>
        <div className={twJoin('space-y-1', !noResize && 'sm:space-y-0')}>
            <div
                className={twJoin(
                    'text-sm font-semibold leading-none',
                    !noResize && 'sm:text-xl sm:leading-tight md:text-xl'
                )}
            >
                <span>
                    {name}
                    {noResize && ' '}
                </span>
                {nameKana && (
                    <>
                        <br
                            className={twJoin(
                                noResize ? 'hidden' : 'sm:hidden'
                            )}
                        />
                        <span
                            className={twJoin(
                                'text-xs',
                                noResize ?
                                    'text-grey-600 dark:text-grey-200'
                                :   'sm:text-sm'
                            )}
                        >
                            <span className={twJoin(!noResize && 'sm:hidden')}>
                                (
                            </span>
                            <span
                                className={twJoin(
                                    'hidden',
                                    !noResize && 'sm:inline'
                                )}
                            >
                                （
                            </span>
                            {nameKana})
                        </span>
                    </>
                )}
            </div>
            <div
                className={twJoin(
                    'text-xs leading-none text-grey-600 dark:text-grey-400',
                    !noResize && 'sm:text-sm sm:leading-tight'
                )}
            >
                {role}
            </div>
        </div>
        {(github || linkedin) && (
            <div className="flex items-center gap-4">
                {github && (
                    <a
                        aria-label="GitHub"
                        href={github}
                        rel="noreferrer"
                        target="_blank"
                    >
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
