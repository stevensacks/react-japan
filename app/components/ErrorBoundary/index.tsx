import type {FC} from 'react';
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Scripts,
    useRouteError,
} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';

const ErrorBoundary: FC = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return (
                <html lang="en">
                    <head>
                        <title>404 - Page not found</title>
                        <Meta />
                        <Links />
                    </head>
                    <body>
                        <main className="absolute inset-0 flex items-center justify-center">
                            <div
                                className={twJoin(
                                    'flex items-center gap-5 text-center'
                                )}
                            >
                                <h1 className="border-r pr-5 text-2xl leading-10 tracking-wide">
                                    404
                                </h1>
                                <h2 className="text-sm tracking-wide">
                                    Page not found
                                </h2>
                            </div>
                        </main>
                        <Scripts />
                    </body>
                </html>
            );
        }

        return (
            <html lang="en">
                <head>
                    <title>Error - React Japan</title>
                    <Meta />
                    <Links />
                </head>
                <body>
                    <main className="space-y-4 p-8">
                        <h1 className="text-2xl">
                            An unexpected error occurred
                        </h1>
                        <h2 className="text-lg">{error.statusText}</h2>
                        {error.data && <p>{error.data}</p>}
                    </main>
                </body>
            </html>
        );
    }

    if (error instanceof Error) {
        return (
            <html lang="en">
                <head>
                    <title>Error - React Japan</title>
                    <Meta />
                    <Links />
                </head>
                <body>
                    <main className="space-y-4 p-8">
                        <h1 className="text-4xl">Error</h1>
                        <p>{error.message}</p>
                        <pre className="whitespace-pre-wrap border border-red-700 p-4 text-sm">
                            {error.stack}
                        </pre>
                    </main>
                </body>
            </html>
        );
    }

    return (
        <html lang="en">
            <head>
                <title>Unexpected error - React Japan</title>
                <Meta />
                <Links />
            </head>
            <body>
                <main className="p-8">
                    <h1 className="text-2xl">An unexpected error occurred</h1>
                </main>
            </body>
        </html>
    );
};

export default ErrorBoundary;
