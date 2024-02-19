import type {FC, ReactNode} from 'react';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {twMerge} from 'tailwind-merge';

type AuthorProps = {
    className?: string;
    github: string;
    image: string;
    linkedin?: string;
    name: string;
    nameKana?: string;
    role: ReactNode;
};

const Author: FC<AuthorProps> = ({
    className,
    github,
    image,
    linkedin,
    name,
    nameKana,
    role,
}) => (
    <div className={twMerge('flex items-center gap-3 sm:gap-4', className)}>
        <div className="overflow-hidden rounded-full border border-grey-300 dark:border-grey-800">
            <img
                alt={name}
                className="m-0 size-8 sm:size-12 md:size-16"
                src={image}
            />
        </div>
        <div className="space-y-1 sm:space-y-0">
            <div className="text-sm font-bold leading-none sm:text-xl sm:leading-tight md:text-xl">
                <span>{name}</span>
                {nameKana && (
                    <>
                        <br className="sm:hidden" />
                        <span className="text-xs sm:text-sm">
                            <span className="sm:hidden">(</span>
                            <span className="hidden sm:inline">（</span>
                            {nameKana})
                        </span>
                    </>
                )}
            </div>
            <div className="text-xs leading-none text-grey-600 dark:text-grey-400 sm:text-sm sm:leading-tight">
                {role}
            </div>
        </div>
        <div className="flex items-center gap-4">
            <a
                aria-label="GitHub"
                href={github}
                rel="noreferrer"
                target="_blank"
            >
                <FontAwesomeIcon
                    className="text-grey-900 hover:text-grey-800 dark:text-grey-100 dark:hover:text-white"
                    icon={faGithub}
                    size="xl"
                />
            </a>
            {linkedin && (
                <a
                    aria-label="LinkedIn"
                    href={linkedin}
                    rel="noreferrer"
                    target="_blank"
                >
                    <FontAwesomeIcon
                        className="text-grey-900 hover:text-grey-800 dark:text-grey-100 dark:hover:text-white"
                        icon={faLinkedin}
                        size="xl"
                    />
                </a>
            )}
        </div>
    </div>
);

export default Author;
