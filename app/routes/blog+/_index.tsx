import type {LinksFunction, MetaFunction} from '@remix-run/node';
import ArticlesList from '~/components/ArticlesList';
import Layout from '~/components/Layout';
import type {ArticleMeta} from '~/types';
import {formatAbbreviatedMonthDayYear} from '~/utils/date';
import {sharedMetaTags} from '~/utils/http';

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

const articles: Array<ArticleMeta> = [
    {
        author: {
            image: '/authors/jacob-paris.jpg',
            name: 'Jacob Paris',
            nameKana: 'ジェイコブ・パリス',
            role: 'Contributor',
        },
        date: formatAbbreviatedMonthDayYear(new Date('2023-10-31'), 'ja'),
        description:
            'Remixアプリは、Vercel、Fastly、Netlify、Cloudflare、AWS Lambdaのようなサーバーレスプロバイダーでホストすべきでしょうか？それともFly、Render、Railway、DigitalOceanのような長寿命サーバーでしょうか？このガイドは、あなたのアプリに適したホスティングオプションを選択するのに役立ちます。',
        title: '2024年、Remixアプリはどこでホスティングされる？',
        to: 'where-to-host-remix',
    },
    {
        author: {
            image: '/authors/ryan-florence.png',
            name: 'Ryan Florence',
            nameKana: 'ライアン・フローレンス',
            role: 'Remix Team',
        },
        date: formatAbbreviatedMonthDayYear(new Date('2022-01-11'), 'ja'),
        description: 'RemixとNext.jsの客観的比較',
        title: 'RemixとNext.JS',
        to: 'remix-vs-next',
    },
];

const Blog = () => (
    <Layout>
        <div className="container mx-auto md:max-w-[40rem]">
            <ArticlesList articles={articles} className="mt-4" />
        </div>
    </Layout>
);

export default Blog;
