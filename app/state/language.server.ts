import {createCookieSessionStorage, redirect} from '@remix-run/node';
import {env} from '~/env.server';
import type {Language} from '~/languages';

export const languageStorage = createCookieSessionStorage({
    cookie: {
        httpOnly: true,
        name: 'i18next',
        path: '/',
        sameSite: 'lax',
        secrets: [env.SESSION_SECRET],
        secure: env.NODE_ENV === 'production',
    },
});

export const isSupportedLanguage = (value: unknown) =>
    typeof value === 'string' && env.SUPPORTED_LOCALES.includes(value);

export const getLanguageSession = async (request: Request) => {
    const session = await languageStorage.getSession(
        request.headers.get('cookie')
    );

    return {
        commit: () => languageStorage.commitSession(session),
        getLanguage: () => {
            const languageValue = session.get('language');

            return isSupportedLanguage(languageValue) ? languageValue : null;
        },
        setLanguage: (value: Language) => session.set('language', value),
    };
};

type LanguageSessionArgs = {
    cookie?: string;
    currentPrefix: string;
    language: string;
    request: Request;
};

const getLanguagePrefix = (language: string) =>
    language === 'en' ? '' : `/${language}`;

export const getRedirectUrl = ({
    currentPrefix,
    language,
    request,
}: LanguageSessionArgs) => {
    const {hash, pathname, search} = new URL(request.url);

    const nextPath = `${getLanguagePrefix(language)}${pathname.slice(
        currentPrefix.length + (pathname.startsWith(currentPrefix) ? 0 : 1)
    )}`;

    return `${nextPath}${search}${hash}`;
};

const redirectToRegion = (args: LanguageSessionArgs) => {
    const redirectUrl = getRedirectUrl(args);

    return args.cookie ?
            redirect(redirectUrl, {headers: {'Set-Cookie': args.cookie}})
        :   redirect(redirectUrl);
};

export const checkLanguagePrefix = async (args: LanguageSessionArgs) => {
    const {cookie, currentPrefix, language} = args;

    if (currentPrefix !== getLanguagePrefix(language)) {
        throw redirectToRegion(args);
    }

    return {
        headers: cookie ? {'Set-Cookie': cookie} : undefined,
    };
};
