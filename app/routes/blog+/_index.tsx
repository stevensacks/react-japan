import type {LinksFunction, MetaFunction} from '@remix-run/node';
import {Link} from '@remix-run/react';
import Layout from '~/components/Layout';
import {sharedMetaTags} from '~/utils/http.server';

export const meta: MetaFunction = () => [
    {title: 'ブログ - React Japan'},
    {content: '記事', name: 'description'},
    {content: 'ブログ - React Japan', name: 'twitter:title'},
    {content: '記事', name: 'twitter:description'},
    {content: 'ブログ - React Japan', name: 'og:title'},
    {content: '記事', name: 'og:description'},
    ...sharedMetaTags,
];

export const links: LinksFunction = () => [
    {
        href: 'https://react-japan.dev/blog/en',
        hreflang: 'en',
        rel: 'alternate',
    },
    {
        href: 'https://react-japan.dev/blog',
        hreflang: 'ja',
        rel: 'alternate',
    },
];

const Blog = () => (
    <Layout>
        <h1 className="text-4xl font-semibold">ブログ</h1>
        <ul className="mt-4">
            <li>
                <Link prefetch="intent" to="where-to-host-remix">
                    Remixアプリをホストする場所
                </Link>
            </li>
            <li>
                <Link prefetch="intent" to="remix-vs-next">
                    RemixとNext.JS
                </Link>
            </li>
        </ul>
    </Layout>
);

export default Blog;
