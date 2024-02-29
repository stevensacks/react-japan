import type {MetaFunction} from '@remix-run/node';
import {Link} from '@remix-run/react';
import Layout from '~/components/Layout';

export const meta: MetaFunction = () => [
    {title: 'ブログ - React Japan'},
    {content: 'React Japanへようこそ！', name: 'description'},
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
        </ul>
    </Layout>
);

export default Blog;
