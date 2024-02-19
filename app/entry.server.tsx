/* eslint-disable prefer-arrow/prefer-arrow-functions,no-console */
/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import {renderToPipeableStream} from 'react-dom/server';
import type {EntryContext} from '@remix-run/node';
import {createReadableStreamFromReadable} from '@remix-run/node';
import {RemixServer} from '@remix-run/react';
import {isbot} from 'isbot';
import {PassThrough} from 'node:stream';
import 'dotenv/config';

const ABORT_DELAY = 5000;

export default async function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    const url = new URL(request.url);

    // enforce trailing slash on all routes
    if (url.pathname !== '/' && url.pathname.endsWith('/')) {
        url.pathname = url.pathname.slice(0, -1);

        return Response.redirect(url.toString(), 301);
    }

    const userAgent = request.headers.get('user-agent') ?? '';

    const callbackName = isbot(userAgent) ? 'onAllReady' : 'onShellReady';

    return new Promise((resolve, reject) => {
        let didError = false;

        const {abort, pipe} = renderToPipeableStream(
            <RemixServer context={remixContext} url={request.url} />,
            {
                [callbackName]: () => {
                    const body = new PassThrough();

                    responseHeaders.set('Content-Type', 'text/html');

                    resolve(
                        new Response(createReadableStreamFromReadable(body), {
                            headers: responseHeaders,
                            status: didError ? 500 : responseStatusCode,
                        })
                    );

                    pipe(body);
                },
                onError(error: unknown) {
                    didError = true;

                    console.error(error);
                },
                onShellError(error: unknown) {
                    reject(error);
                },
            }
        );

        setTimeout(abort, ABORT_DELAY);
    });
}
