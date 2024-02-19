import {createCookieSessionStorage} from '@remix-run/node';
import {env} from '~/env.server';
import type {Theme} from './theme';
import {isSupportedTheme} from './theme';

const themeStorage = createCookieSessionStorage({
    cookie: {
        httpOnly: true,
        name: 'hafh-theme',
        path: '/',
        sameSite: 'lax',
        secrets: [env.SESSION_SECRET],
        secure: env.NODE_ENV === 'production',
    },
});

export const getThemeSession = async (request: Request) => {
    const session = await themeStorage.getSession(
        request.headers.get('cookie')
    );

    return {
        commit: () => themeStorage.commitSession(session),
        getTheme: () => {
            const themeValue = session.get('theme');

            return isSupportedTheme(themeValue) ? themeValue : null;
        },
        setTheme: (theme: Theme) => session.set('theme', theme),
    };
};
