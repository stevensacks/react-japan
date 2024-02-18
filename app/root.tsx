import {useTranslation} from 'react-i18next';
import {cssBundleHref} from '@remix-run/css-bundle';
import type {LinksFunction, LoaderFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react';
import {useChangeLanguage} from 'remix-i18next';
import i18next from '~/i18next.server';
import {checkLanguagePrefix, getLanguageSession} from '~/state/language.server';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/tailwind.css';

export const loader = async ({request}: LoaderFunctionArgs) => {
    const languageSession = await getLanguageSession(request);

    const language =
        languageSession.getLanguage() || (await i18next.getLocale(request));

    const {pathname} = new URL(request.url);

    // eslint-disable-next-line no-console
    console.log({pathname});

    const languageRedirect = await checkLanguagePrefix({
        currentPrefix: '/',
        language,
        request,
    });

    return json({language}, {headers: languageRedirect?.headers});
};

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{href: cssBundleHref, rel: 'stylesheet'}] : []),
];

const App = () => {
    const data = useLoaderData<typeof loader>();
    const {i18n} = useTranslation();

    // This hook will change the i18n instance language to the current language
    // detected by the loader, this way, when we do something to change the
    // language, this language will change and i18next will load the correct
    // translation files
    useChangeLanguage(data.language);

    return (
        <html dir={i18n.dir()} lang={data.language}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    content="width=device-width,initial-scale=1"
                    name="viewport"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
};

export {ErrorBoundary};

export default App;
