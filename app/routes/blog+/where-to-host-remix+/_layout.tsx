import {faLeftLong} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import type {LinksFunction, MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
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
            'Remixアプリは、Vercel、Fastly、Netlify、Cloudflare、AWS Lambdaのようなサーバーレスプロバイダーでホストすべきでしょうか？それともFly、Render、Railway、DigitalOceanのような長寿命サーバーでしょうか？このガイドは、あなたのアプリに適したホスティングオプションを選択するのに役立ちます。',
        sourceUrl: 'https://www.jacobparis.com/content/where-to-host-remix',
        title: '2024年、Remixアプリはどこでホスティングされる？',
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
    ];
};

export const links: LinksFunction = () => [
    {
        href: 'https://www.jacobparis.com/content/where-to-host-remix',
        hreflang: 'en',
        rel: 'alternate',
    },
    {
        href: 'https://react-tokyo.dev/blog/where-to-host-remix',
        hreflang: 'ja',
        rel: 'alternate',
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
