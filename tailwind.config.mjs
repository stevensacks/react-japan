import aspectRatioPlugin from '@tailwindcss/aspect-ratio';
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

const isDev = process.env.NODE_ENV !== 'production';
const isStorybook = process.env.SB === '1';

/** @type {TailwindConfig} */
export default {
    content:
        isDev || isStorybook ?
            ['./app/**/*.{ts,tsx}']
        :   ['./app/**/*!(.stories).{ts,tsx}'],
    darkMode: 'class',
    plugins: [aspectRatioPlugin, typography],
    theme: {
        colors: {
            aqua: {
                100: '#cafdf8',
                200: '#94fbf4',
                300: '#3defe9',
                400: '#24dddc',
                50: '#effefc',
                500: '#0cbdc0',
                600: '#06969b',
                700: '#0a767b',
                800: '#0d5e62',
                900: '#104d51',
                brand: '#3defe9',
            },
            black: '#000',
            blue: {
                100: '#d9edff',
                200: '#bce0ff',
                300: '#8ecdff',
                400: '#59b0ff',
                50: '#eef7ff',
                500: '#3992ff',
                // hard-coded in embedded SVG for <docs-*> elements
                600: '#1b6ef5',
                700: '#1458e1',
                800: '#1747b6',
                900: '#193f8f',
                brand: '#3992ff',
            },
            current: 'currentColor',
            green: {
                100: '#dffade',
                200: '#c1f3bf',
                300: '#90e88d',
                400: '#6bd968',
                50: '#f2fcf1',
                500: '#30ba2d',
                600: '#229920',
                700: '#1d791c',
                800: '#1c601b',
                900: '#184f18',
                brand: '#6bd968',
            },
            grey: {
                100: '#e3e3e3',
                200: '#c8c8c8',
                300: '#a4a4a4',
                400: '#818181',
                50: '#f7f7f7',
                500: '#666666',
                600: '#515151',
                700: '#434343',
                800: '#383838',
                900: '#121212',
            },
            inherit: 'inherit',
            pink: {
                100: '#fde8ff',
                200: '#fbd1fd',
                300: '#faadfa',
                400: '#f77bf6',
                50: '#fff4ff',
                500: '#ec49e9',
                600: '#d83bd2',
                700: '#ac1fa3',
                800: '#8d1b85',
                900: '#731c6b',
                brand: '#d83bd2',
            },
            red: {
                100: '#ffe1e3',
                200: '#ffc9cd',
                300: '#fea3aa',
                400: '#fc6d78',
                50: '#fef2f3',
                500: '#f44250',
                // hard-coded in embedded SVG for <docs-*> elements
                600: '#e12130',
                700: '#BC002D',
                800: '#9d1722',
                900: '#821a22',
                brand: '#f44250',
            },
            transparent: 'transparent',
            white: '#fff',
            yellow: {
                100: '#fff9c2',
                200: '#fff087',
                300: '#ffde44',
                400: '#fecc1b',
                50: '#fffce8',
                // hard-coded in embedded SVG for <docs-*> elements
                500: '#eeb004',
                600: '#cd8701',
                // hard-coded in embedded SVG for <docs-*> elements
                700: '#a45f04',
                800: '#874b0c',
                900: '#733d10',
                brand: '#fecc1b',
            },
        },
        extend: {
            screens: {
                '2xs': '320px',
                xs: '480px',
            },
            // @ts-ignore
            typography: ({theme}) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-body': theme('colors.grey.900'),
                        '--tw-prose-bold': theme('colors.grey.900'),
                        '--tw-prose-bullets': theme('colors.grey.900'),
                        '--tw-prose-links': theme('colors.blue.500'),
                        '--tw-prose-headings': theme('colors.grey.900'),
                        '--tw-prose-quotes': theme('colors.grey.900'),
                        '--tw-prose-invert-body': theme('colors.grey.100'),
                        '--tw-prose-invert-bold': theme('colors.grey.100'),
                        '--tw-prose-invert-bullets': theme('colors.grey.100'),
                        '--tw-prose-invert-links': theme('colors.blue.500'),
                        '--tw-prose-invert-headings': theme('colors.grey.100'),
                        '--tw-prose-invert-quotes': theme('colors.grey.100'),
                    },
                },
            }),
        },
        fontFamily: {
            display: [
                'Inter',
                '"Hiragino Kaku Gothic ProN"',
                '"Hiragino Sans"',
                'Meiryo',
                ...defaultTheme.fontFamily.sans,
            ],
            mono: ['Source Code Pro', ...defaultTheme.fontFamily.mono],
            sans: [
                'Inter',
                '"Hiragino Kaku Gothic ProN"',
                '"Hiragino Sans"',
                'Meiryo',
                ...defaultTheme.fontFamily.sans,
            ],
        },
    },
};
