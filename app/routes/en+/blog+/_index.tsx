import type {LinksFunction, MetaFunction} from '@remix-run/node';
import Layout from '~/components/Layout';
import {sharedMetaTags} from '~/utils/http';

export const meta: MetaFunction = () => [
    {title: 'Blog - React Japan'},
    {content: 'Articles', name: 'description'},
    {content: 'Blog - React Japan', name: 'twitter:title'},
    {content: 'Articles', name: 'twitter:description'},
    {content: 'Blog - React Japan', name: 'og:title'},
    {content: 'Articles', name: 'og:description'},
    ...sharedMetaTags,
];

export const links: LinksFunction = () => [
    {
        href: 'https://react-japan.dev/blog/en',
        hreflang: 'en',
        rel: 'alternate',
    },
    {
        href: 'https://react-japan.dev/blog/',
        hreflang: 'ja',
        rel: 'alternate',
    },
];

const Blog = () => (
    <Layout>
        <h1 className="text-4xl font-semibold">Blog</h1>
    </Layout>
);

export default Blog;
