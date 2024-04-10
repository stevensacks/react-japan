/** @type {import('eslint').Linter.Config} */

const shared = {
    plugins: [
        'no-switch-statements',
        'prefer-arrow',
        'react',
        'simple-import-sort',
        'sonarjs',
        'sort-destructure-keys',
        'sort-keys-fix',
        'sort-react-dependency-arrays',
        'tailwindcss',
        'unicorn',
        'vitest',
        'you-dont-need-lodash-underscore',
    ],
    extends: [
        'eslint:recommended',
        '@remix-run/eslint-config',
        '@remix-run/eslint-config/node',
        'plugin:eslint-comments/recommended',
        'plugin:no-switch-statements/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:sonarjs/recommended',
        'plugin:tailwindcss/recommended',
        'plugin:unicorn/recommended',
        'prettier',
    ],
    rules: {
        'arrow-body-style': ['error', 'as-needed'],
        'prefer-arrow-callback': 'off',
        complexity: 'off',
        'consistent-return': 'off',
        curly: ['error', 'all'],
        'function-paren-newline': 'off',
        'implicit-arrow-newline': 'off',
        'import/no-anonymous-default-export': [
            'error',
            {
                allowArray: true,
                allowLiteral: true,
                allowObject: true,
            },
        ],
        'import/order': 'off',
        'prefer-const': 'error',
        'sort-imports': 'off',
        'simple-import-sort/imports': [
            'error',
            {
                groups: [['^react', '^@?\\w', '^', '^\\.', '^\\u0000']],
            },
        ],
        'simple-import-sort/exports': 'error',
        'import/prefer-default-export': 'off',
        'import/no-named-as-default': 'off',
        'import/extensions': 'off',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['to'],
            },
        ],
        'jsx-a11y/label-has-for': 'off',
        'no-lonely-if': ['error'],
        'no-nested-ternary': 'off',
        'no-return-assign': ['error'],
        'no-unused-vars': 'off',
        'max-params': ['error', 4],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: ['block-like', 'export', 'return'],
            },
        ],
        'prefer-object-spread': ['error'],
        'spaced-comment': 'off',
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: false,
            },
        ],
        'eslint-comments/disable-enable-pair': 'off',
        'eslint-comments/no-unused-disable': 'error',
        'import/first': 'error',
        'import/no-amd': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'react/boolean-prop-naming': [
            'error',
            {
                propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
                rule: '^((is|has|can|show|hide|no)[A-Z]([A-Za-z0-9]?)+|(show|hide|disabled|required))',
            },
        ],
        'react/button-has-type': 'off',
        'react/require-default-props': 'off',
        'react/jsx-boolean-value': ['error', 'always'],
        'react/jsx-filename-extension': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/prefer-stateless-function': ['error'],
        'react/function-component-definition': 'off',
        'react/prop-types': 'off',
        'react/jsx-newline': ['error', {prevent: true}],
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-sort-props': [
            'error',
            {
                ignoreCase: false,
                reservedFirst: true,
            },
        ],
        'react/no-danger': 'off',
        'sort-destructure-keys/sort-destructure-keys': 'error',
        'sort-keys': [
            'error',
            'asc',
            {caseSensitive: true, natural: true, minKeys: 2},
        ],
        'sort-keys-fix/sort-keys-fix': 'warn',
        'prefer-arrow/prefer-arrow-functions': [
            'error',
            {
                disallowPrototype: true,
                singleReturnOnly: false,
                classPropertiesAllowed: false,
            },
        ],
        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-inverted-boolean-check': 'error',
        'unicorn/consistent-destructuring': 'error',
        'unicorn/new-for-builtins': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/prefer-export-from': 'off',
        'unicorn/prefer-set-has': 'off',
        'unicorn/prefer-switch': 'off',
        'unicorn/prefer-ternary': 'off',
        'unicorn/prevent-abbreviations': [
            'error',
            {
                ignore: [
                    'acc',
                    'ctx',
                    'e2e',
                    'env',
                    'obj',
                    'prev',
                    'req',
                    'res',
                    /args/i,
                    /fn/i,
                    /params/i,
                    /props/i,
                    /ref/i,
                    /utils/i,
                ],
            },
        ],
        'unicorn/text-encoding-identifier-case': 'off',

        'sort-react-dependency-arrays/sort': 'error',

        // classnames order handled by prettier-plugin-tailwindcss
        'tailwindcss/classnames-order': 'off',
    },
};

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        mocha: true,
        es6: true,
    },
    settings: {
        jest: {
            version: 28,
        },
        react: {
            pragma: 'React',
            version: 'detect',
        },
        tailwindcss: {
            callees: ['twJoin', 'twMerge'],
        },
    },
    plugins: shared.plugins,
    extends: ['airbnb', ...shared.extends],
    rules: shared.rules,
    ignorePatterns: ['node_modules', '*.config.js', '.storybook/static', 'build'],
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            parser: '@typescript-eslint/parser',
            globals: {
                Api: 'readonly',
            },
            parserOptions: {
                project: './tsconfig.json',
            },
            extends: [
                'airbnb',
                'airbnb-typescript',
                'plugin:@typescript-eslint/recommended',
                'plugin:typescript-sort-keys/recommended',
                ...shared.extends,
            ],
            plugins: [
                ...shared.plugins,
                '@typescript-eslint',
                'typescript-sort-keys',
            ],
            rules: {
                ...shared.rules,
                '@typescript-eslint/array-type': [
                    'error',
                    {default: 'generic', readOnly: 'generic'},
                ],
                '@typescript-eslint/ban-ts-comment': 'off',
                '@typescript-eslint/no-unnecessary-boolean-literal-compare': [
                    'error',
                ],
                '@typescript-eslint/no-throw-literal': 'off',
                '@typescript-eslint/no-unused-vars': 'error',
            },
        },
        {
            files: ['app/types/**/*.d.ts'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
            },
        },
        {
            files: ['*.test.ts?(x)', '*.stories.ts?(x)'],
            env: {
                'vitest-globals/env': true,
            },
            extends: [
                '@remix-run/eslint-config/jest-testing-library',
                'plugin:vitest-globals/recommended',
                'plugin:vitest/recommended',
            ],
            rules: {
                'guard-for-in': 'off',
                'import/no-extraneous-dependencies': 'off',
                'import/extensions': 'off',
                'no-await-in-loop': 'off',
                'no-restricted-syntax': 'off',
                'react/jsx-props-no-spreading': 'off',
                'sonarjs/no-identical-functions': 'off',
                /* this rule is broken because userEvent.click() actually is a Promise */
                'testing-library/no-await-sync-events': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
        {
            files: ['test/**/*.ts?(x)'],
            env: {
                'vitest-globals/env': true,
            },
            extends: [
                '@remix-run/eslint-config/jest-testing-library',
                'plugin:vitest-globals/recommended',
                'plugin:vitest/recommended',
            ],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
                'import/no-extraneous-dependencies': 'off',
                'import/prefer-default-export': 'off',
            },
        },
        {
            files: ['*.tsx', '**/hooks/*.ts?(x)'],
            rules: {
                'unicorn/filename-case': ['error', {case: 'camelCase'}],
            },
        },
        {
            files: ['app/**/!(*.test|*.stories).ts?(x)'],
            rules: {
                'import/no-unresolved': 'error',
            },
        },
        {
            files: ['./*.ts'],
            rules: {
                'global-require': 'off',
                'no-void': 'off',
                'import/no-unresolved': 'error',
                'import/no-extraneous-dependencies': 'off',
                'import/prefer-default-export': 'off',
                'unicorn/prefer-module': 'off',
                'unicorn/prevent-abbreviations': 'off',
            },
        },
        {
            files: ['.storybook/**/*.ts?(x)'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
                'import/no-unresolved': 'off',
            },
        },
        {
            files: ['test/**/*.ts?(x)'],
            rules: {
                'unicorn/filename-case': ['error', {case: 'kebabCase'}],
            },
        },

        {
            files: ['**/routes/**/*.tsx'],
            rules: {
                'react/display-name': 'off',
                'unicorn/filename-case': 'off',
            },
        },
        {
            files: ['app/?(components|pages|services|utils)/**/*.ts?(x)'],
            rules: {
                'max-lines': ['error', 200],
            },
        },
        {
            files: ['**/*.d.ts'],
            rules: {
                'prefer-arrow/prefer-arrow-functions': 'off',
            },
        },
    ],
};
