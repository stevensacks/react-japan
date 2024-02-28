import mdx from '@mdx-js/rollup';
import {vitePlugin as remix} from '@remix-run/dev';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import {remixDevTools} from 'remix-development-tools/vite';
import {flatRoutes} from 'remix-flat-routes';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        mdx({
            rehypePlugins: [
                rehypePrettyCode,
                rehypeStringify,
                rehypeSlug,
                rehypeAutolinkHeadings,
            ],
            remarkPlugins: [
                remarkFrontmatter,
                remarkMdxFrontmatter,
                remarkHtml,
                remarkParse,
                remarkRehype,
                remarkGfm,
            ],
            remarkRehypeOptions: {
                allowDangerousHtml: true,
            },
        }),
        remix({
            ignoredRouteFiles: ['**/*'],
            routes: async (defineRoutes) =>
                flatRoutes('routes', defineRoutes, {
                    ignoredRouteFiles: [
                        '.*',
                        '**/*.css',
                        '**/*.test.{ts,tsx}',
                        '**/__*.*',
                    ],
                }),
        }),
        remixDevTools(),
        tsconfigPaths(),
    ],
    server: {
        open: true,
    },
    ssr: {
        noExternal: ['remix-i18next'],
    },
});
