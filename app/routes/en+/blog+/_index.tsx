import type {MetaFunction} from '@remix-run/node';
import Layout from '~/components/Layout';

export const meta: MetaFunction = () => [
    {title: 'Blog - React Japan'},
    {content: 'Welcome to React Japan!', name: 'description'},
];

const Blog = () => (
    <Layout>
        <h1 className="text-4xl font-semibold">Blog</h1>
    </Layout>
);

export default Blog;
