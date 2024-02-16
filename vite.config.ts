import mdx from '@mdx-js/rollup';
import {unstable_vitePlugin as remix} from '@remix-run/dev';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import {flatRoutes} from 'remix-flat-routes';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        // @ts-ignore
        mdx({
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
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
        tsconfigPaths(),
    ],
});
