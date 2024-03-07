import type {FC, ReactNode} from 'react';
import {Links, Meta, Scripts, ScrollRestoration} from '@remix-run/react';
import {ThemeHead} from '~/state/theme';

type DocumentProps = {
    children: ReactNode;
    className?: string;
    isSsrTheme?: boolean;
    lang: string;
    noIndex?: boolean;
    title?: string;
};

const Document: FC<DocumentProps> = ({
    children,
    className,
    isSsrTheme = false,
    lang,
    noIndex,
    title,
}) => (
    <html className={className} lang={lang}>
        <head>
            <meta charSet="utf-8" />
            <meta
                content="width=device-width,initial-scale=1"
                name="viewport"
            />
            <meta content="React Japan" name="og:site_name" />
            <meta content="summary" name="twitter:card" />
            <meta content="/assets/logo1080.png" name="image" />
            <meta content="/assets/logo1080.png" name="og:image" />
            <meta content="/assets/logo1080.png" name="twitter:image" />
            <Meta />
            <Links />
            <ThemeHead isSsrTheme={isSsrTheme} />
            {noIndex && <meta content="noindex" name="robots" />}
            {title && <title>{title}</title>}
        </head>
        <body>
            {children}
            <ScrollRestoration />
            <Scripts />
        </body>
    </html>
);

export default Document;
