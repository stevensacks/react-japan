import {faLeftLong} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {json, type MetaFunction} from '@remix-run/node';
import {Link, Outlet, useLoaderData} from '@remix-run/react';
import Article from '~/components/Article';
import Layout from '~/components/Layout';
import type {ArticleMeta} from '~/types';
import {formatAbbreviatedMonthDayYear} from '~/utils/date';

export const loader = async () => {
    const meta: ArticleMeta = {
        author: {
            image: '/authors/jacob-paris.jpg',
            name: 'Jacob Paris',
        },
        date: formatAbbreviatedMonthDayYear(new Date('2023-10-31'), 'ja'),
        description:
            'Should you host your Remix app on a serverless provider like Vercel, Fastly, Netlify, Cloudflare, or AWS Lambda? Or a long-lived server like Fly, Render, Railway, or DigitalOcean? This guide will help you choose the right hosting option for your app.',
        sourceUrl: 'https://www.jacobparis.com/content/where-to-host-remix',
        title: 'Where to host your Remix app in 2024',
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

export const handle = {
    breadcrumb: () => (
        <Link
            className="plain-link hover:text-red-600 hover:underline dark:hover:text-red-500"
            to="/blog"
        >
            <FontAwesomeIcon icon={faLeftLong} />
            &nbsp; 戻る
        </Link>
    ),
};

const BlogArticleLayout = () => {
    const data = useLoaderData<typeof loader>();

    return (
        <Layout hideLocaleSwitcher={true}>
            <Article meta={data.meta}>
                <Outlet />
            </Article>
        </Layout>
    );
};

export default BlogArticleLayout;
