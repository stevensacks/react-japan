import type {FC} from 'react';
import {Link, useLocation, useMatches} from '@remix-run/react';
import {stripTrailingSlash} from '~/utils/http';

const LocaleSwitcher: FC = () => {
    const location = useLocation();
    const match = useMatches().pop();
    const isEnglish = location.pathname.startsWith('/en');

    if (!match) {
        return (
            <span className="text-sm font-semibold sm:text-base">
                {isEnglish ? '日本語' : 'EN'}
            </span>
        );
    }

    const localeTo =
        match.pathname === '/' ? '/en'
        : match.pathname === '/en' ? '/'
        : stripTrailingSlash(
                isEnglish ?
                    match.pathname.replace('/en', '')
                :   `/en${match?.pathname}`
            );

    return (
        <Link
            className="plain-link text-sm font-semibold sm:text-base"
            to={localeTo}
        >
            {isEnglish ? '日本語' : 'EN'}
        </Link>
    );
};

export default LocaleSwitcher;
