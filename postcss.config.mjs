let cssnano = {};
if (process.env.NODE_ENV === 'production') {
    cssnano = {
        cssnano: {
            preset: ['default', {discardComments: {removeAll: true}}],
        },
    };
}

export default {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
        ...cssnano,
    },
};
