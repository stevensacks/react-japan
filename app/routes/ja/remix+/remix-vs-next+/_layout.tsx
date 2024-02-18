import {json, type MetaFunction} from '@remix-run/node';
import {Outlet, useLoaderData} from '@remix-run/react';
import {format} from 'date-fns';
import Article from '~/components/Article';
import Layout from '~/components/Layout';
import type {ArticleMeta} from '~/types';

export const loader = async () => {
    const meta: ArticleMeta = {
        author: {
            image: '/authors/profile-ryan-florence.png',
            name: 'Ryan Florence',
            role: 'Co-Founder',
        },
        date: format(new Date('2022-01-11'), 'PPP'),
        description: 'RemixとNext.jsの客観的比較',
        image: '/blog-images/headers/remix-vs-next.jpg',
        title: 'RemixとNext.js - React Japan',
    };

    return json({meta});
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
    {title: data?.meta.title},
    {
        content: data?.meta.description,
        name: 'description',
    },
];

const RemixVsNextLayout = () => {
    const data = useLoaderData<typeof loader>();

    return (
        <Layout>
            <Article meta={data.meta}>
                <Outlet />
            </Article>
        </Layout>
    );
};

export default RemixVsNextLayout;
