import type {FC} from 'react';
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
import {twJoin} from 'tailwind-merge';
import State from '~/state';
import {ThemeHead, useTheme} from '~/state/theme';
import {getThemeSession} from '~/state/theme.server';
import ErrorBoundary from './components/ErrorBoundary';
import fontAwesome from './icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './styles/tailwind.css';

fontAwesome();

export const loader = async ({request}: LoaderFunctionArgs) => {
    const themeSession = await getThemeSession(request);

    return json({
        theme: themeSession.getTheme(),
    });
};

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{href: cssBundleHref, rel: 'stylesheet'}] : []),
];

const App: FC = () => {
    const data = useLoaderData<typeof loader>();
    const [theme] = useTheme();

    return (
        <html className={twJoin(theme)} lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    content="width=device-width,initial-scale=1"
                    name="viewport"
                />
                <Meta />
                <Links />
                <ThemeHead isSsrTheme={Boolean(data.theme)} />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
};

const AppWithState = () => {
    const data = useLoaderData<typeof loader>();

    return (
        <State theme={data.theme}>
            <App />
        </State>
    );
};

export {ErrorBoundary};

export default AppWithState;
