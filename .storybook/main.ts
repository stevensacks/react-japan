import type {StorybookConfig} from '@storybook/react-vite';
import {mergeConfig} from 'vite';
import turbosnap from 'vite-plugin-turbosnap';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        grid: false,
        measure: false,
        outline: false,
      },
    },
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  docs: {
    autodocs: 'tag',
  },
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },
  stories: ['../app/**/*.stories.tsx'],
  viteFinal: async (viteConfig, {configType}) =>
    mergeConfig(viteConfig, {
      plugins: [
        tsconfigPaths(),
        ...(configType === 'PRODUCTION' ?
          [turbosnap({rootDir: viteConfig.root ?? process.cwd()})]
        : []),
      ],
    }),
};

export default config;
