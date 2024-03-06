import {addons} from '@storybook/preview-api';
import type {Preview} from '@storybook/react';
import {themes} from '@storybook/theming';
import isChromatic from 'chromatic/isChromatic';
import {DARK_MODE_EVENT_NAME} from 'storybook-dark-mode';
import brandImage from '../public/favicon-32x32.png';
import chromatic from './decorators/chromatic';
import viewport from './viewport';
import '~/styles/tailwind.css';

// render dark mode in chromatic snapshots
const isChromaticSnapshot =
    isChromatic() ||
    (process.env.NODE_ENV === 'test' ?
        false
        // @ts-ignore
    :   [...(window?.location.ancestorOrigins || {length: 0})].some((origin) =>
            origin.includes('www.chromatic.com')
        ));

const preview: Preview = {
    decorators: isChromaticSnapshot ? [chromatic] : [],
    parameters: {
        actions: {argTypesRegex: '^on[A-Z].*'},
        chromatic: {viewports: [1280]},
        controls: {
            expanded: false,
            hideNoControlsWarning: true,
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        darkMode: {
            dark: {
                ...themes.dark,
                brandImage,
                brandTarget: '_blank',
                brandTitle: 'React Japan',
                brandUrl: 'https://react-japan.dev',
            },
            light: {
                ...themes.light,
                brandImage,
                brandTarget: '_blank',
                brandTitle: 'React Japan',
                brandUrl: 'https://react-japan.dev',
            },
        },
        layout: 'fullscreen',
        viewport,
    },
};

if (!isChromaticSnapshot) {
    // listen for dark mode toggle changes
    const channel = addons.getChannel();
    channel.on(DARK_MODE_EVENT_NAME, (isDark: boolean) => {
        // eslint-disable-next-line unicorn/prevent-abbreviations
        const docsStory = document.querySelector('.docs-story');

        if (isDark) {
            document.documentElement.classList.add('dark');
            docsStory?.classList.add('bg-grey-900');
            docsStory?.classList.add('text-white');
        } else {
            document.documentElement.classList.remove('dark');
            docsStory?.classList.remove('bg-grey-900');
            docsStory?.classList.remove('text-white');
        }
    });
}

export default preview;
