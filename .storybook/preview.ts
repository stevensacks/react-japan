import type {Preview} from '@storybook/react';
import {themes} from '@storybook/theming';
import isChromatic from 'chromatic/isChromatic';
import chromatic from './decorators/chromatic';
import logoDark from './static/logo-dark.png';
import logoLight from './static/logo-light.png';
import viewport from './viewport';
import '~/styles/tailwind.css';

// render dark mode in chromatic snapshots
const isChromaticSnapshot =
  isChromatic() ||
  (process.env.NODE_ENV === 'test' ?
    false
    // @ts-ignore
  : [...(window?.location.ancestorOrigins || {length: 0})].some((origin) =>
      origin.includes('www.chromatic.com')
    ));

const preview: Preview = {
  decorators: isChromaticSnapshot ? [chromatic] : [],
  parameters: {
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
        brandImage: logoDark,
        brandTarget: '_blank',
        brandTitle: 'React Japan',
        brandUrl: 'https://react-japan.dev',
      },
      darkClass: ['dark', 'bg-grey-900', 'text-white'],
      light: {
        ...themes.light,
        brandImage: logoLight,
        brandTarget: '_blank',
        brandTitle: 'React Japan',
        brandUrl: 'https://react-japan.dev',
      },
      lightClass: ['light', 'bg-white', 'text-grey-900'],
      stylePreview: true,
    },
    layout: 'fullscreen',
    viewport,
  },
};

export default preview;
