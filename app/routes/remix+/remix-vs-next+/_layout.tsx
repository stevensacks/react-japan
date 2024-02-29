import {json, type MetaFunction} from '@remix-run/node';
import {Outlet, useLoaderData} from '@remix-run/react';
import Article from '~/components/Article';
import Layout from '~/components/Layout';
import type {ArticleMeta} from '~/types';
import {formatAbbreviatedMonthDayYear} from '~/utils/date';

export const loader = async () => {
    const meta: ArticleMeta = {
        author: {
            image: '/authors/ryan-florence.png',
            name: 'Ryan Florence',
        },
        date: formatAbbreviatedMonthDayYear(new Date('2022-01-11'), 'ja'),
        description: 'RemixとNext.jsの客観的比較',
        sourceUrl: 'https://remix.run/blog/remix-vs-next',
        title: 'RemixとNext.js',
    };

    return json({meta});
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
    {title: `${data?.meta.title} - React Japan`},
    {
        content: data?.meta.description,
        name: 'description',
    },
];

const RemixVsNextLayout = () => {
    const data = useLoaderData<typeof loader>();

    return (
        <Layout hideLocaleSwitcher={true}>
            <Article meta={data.meta}>
                <Outlet />
            </Article>
        </Layout>
    );
};

export default RemixVsNextLayout;
