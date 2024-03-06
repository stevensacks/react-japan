import {json, type LinksFunction, type MetaFunction} from '@remix-run/node';
import {Outlet, useLoaderData} from '@remix-run/react';
import Article from '~/components/Article';
import Layout from '~/components/Layout';
import type {ArticleMeta} from '~/types';
import {formatAbbreviatedMonthDayYear} from '~/utils/date';
import {sharedMetaTags} from '~/utils/http.server';

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

export const meta: MetaFunction<typeof loader> = ({data}) => {
    const title = `${data?.meta.title} - React Japan`;

    return [
        {content: title, name: 'title'},
        {
            content: data?.meta.description,
            name: 'description',
        },
        {content: data?.meta.author.name, name: 'author'},
        {content: data?.meta.date, name: 'date'},
        {content: title, name: 'twitter:title'},
        {content: data?.meta.description, name: 'twitter:description'},
        {content: title, name: 'og:title'},
        {content: data?.meta.description, name: 'og:description'},
        {content: 'article', name: 'og:type'},
        ...sharedMetaTags,
    ];
};

export const links: LinksFunction = () => [
    {
        href: 'https://remix.run/blog/remix-vs-next',
        hreflang: 'en',
        rel: 'alternate',
    },
    {
        href: 'https://react-tokyo.dev/blog/remix-vs-next',
        hreflang: 'ja',
        rel: 'alternate',
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
