/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import {startTransition, StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import {RemixBrowser} from '@remix-run/react';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {getInitialNamespaces} from 'remix-i18next';
import i18n from './i18n';

const hydrate = async () => {
    await i18next
        .use(initReactI18next)
        .use(LanguageDetector)
        .init({
            ...i18n,
            detection: {
                caches: [],
                order: ['htmlTag'],
            },
            ns: getInitialNamespaces(),
        });

    startTransition(() => {
        hydrateRoot(
            document,
            <I18nextProvider i18n={i18next}>
                <StrictMode>
                    <RemixBrowser />
                </StrictMode>
            </I18nextProvider>
        );
    });
};

if (window.requestIdleCallback) {
    window.requestIdleCallback(hydrate);
} else {
    window.setTimeout(hydrate, 1);
}
