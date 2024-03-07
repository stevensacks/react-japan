import type {FC} from 'react';
import {cssBundleHref} from '@remix-run/css-bundle';
import type {
    LinksFunction,
    LoaderFunctionArgs,
    MetaFunction,
} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Outlet, useLoaderData} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';
import Document from '~/components/Document';
import State from '~/state';
import {useTheme} from '~/state/theme';
import {getThemeSession} from '~/state/theme.server';
import tailwind from '~/styles/tailwind.css?url';
import {isProductionHost} from '~/utils/http.server';
import ErrorBoundary from './components/ErrorBoundary';
import '@fortawesome/fontawesome-svg-core/styles.css';

export const loader = async ({request}: LoaderFunctionArgs) => {
    const themeSession = await getThemeSession(request);

    const url = new URL(request.url);
    const language = url.pathname.startsWith('/en') ? 'en' : 'ja';

    const isProduction = isProductionHost(request);

    return json(
        {
            language,
            noIndex: !isProduction,
            theme: themeSession.getTheme(),
        },
        {
            headers: {
                Vary: 'Cookie',
            },
        }
    );
};

export const meta: MetaFunction = () => [
    {content: '/assets/logo1080.png', name: 'image'},
    {content: '/assets/logo1080.png', name: 'og:image'},
    {content: '/assets/logo1080.png', name: 'twitter:image'},
    {content: 'summary', name: 'twitter:card'},
    {content: 'React Japan', name: 'og:site_name'},
];

export const links: LinksFunction = () => {
    const preloadedFonts = [
        'inter-roman-latin-var.woff2',
        'inter-italic-latin-var.woff2',
        'source-code-pro-roman-var.woff2',
        'source-code-pro-italic-var.woff2',
    ];

    return [
        {href: tailwind, rel: 'stylesheet'},
        ...(cssBundleHref ? [{href: cssBundleHref, rel: 'stylesheet'}] : []),
        {
            href: '/apple-touch-icon.png',
            rel: 'apple-touch-icon',
            sizes: '180x180',
        },
        {
            href: '/favicon-32x32.png',
            rel: 'icon',
            sizes: '32x32',
            type: 'image/png',
        },
        {
            href: '/favicon-16x16.png',
            rel: 'icon',
            sizes: '16x16',
            type: 'image/png',
        },
        {href: '/site.webmanifest', rel: 'manifest'},
        ...preloadedFonts.map((font) => ({
            as: 'font',
            href: `/fonts/${font}`,
            rel: 'preload',
        })),
    ];
};

const App: FC = () => {
    const data = useLoaderData<typeof loader>();
    const [theme] = useTheme();

    return (
        <Document
            className={twJoin(theme)}
            isSsrTheme={Boolean(data.theme)}
            lang={data.language}
            noIndex={data.noIndex}
        >
            <Outlet />
        </Document>
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
