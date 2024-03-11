import type {LinksFunction, MetaFunction} from '@remix-run/node';
import Layout from '~/components/Layout';

export const meta: MetaFunction = () => [
    {title: 'Blog - React Japan'},
    {
        content:
            'Welcome to React Japan, where we delve into React development, with a special focus on the Remix framework.',
        name: 'description',
    },
    {content: 'Blog - React Japan', name: 'twitter:title'},
    {
        content:
            'Welcome to React Japan, where we delve into React development, with a special focus on the Remix framework.',
        name: 'twitter:description',
    },
    {content: 'Blog - React Japan', name: 'og:title'},
    {
        content:
            'Welcome to React Japan, where we delve into React development, with a special focus on the Remix framework.',
        name: 'og:description',
    },
];

export const links: LinksFunction = () => [
    {
        href: 'https://react-japan.dev/blog/en',
        hrefLang: 'en',
        rel: 'alternate',
    },
    {
        href: 'https://react-japan.dev/blog/',
        hrefLang: 'ja',
        rel: 'alternate',
    },
];

const Blog = () => (
    <Layout>
        <div />
    </Layout>
);

export default Blog;
