import type {LinksFunction, MetaFunction} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import ArticlesGrid from '~/components/ArticlesGrid';
import Layout from '~/components/Layout';
import {parseArticles} from '~/utils/strapi.server';

export const loader = async () => {
    const response = await fetch(
        `${process.env.STRAPI_BASE_URL}/api/articles?populate=author,hero,tags&populate[1]=author.image`,
        {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            method: 'GET',
        }
    );

    if (!response.ok) {
        throw response;
    }

    const data = await response.json();

    if (data.error) {
        throw new Response('Error loading data from strapi', {status: 500});
    }

    return parseArticles(data.data);
};

export const meta: MetaFunction = () => [
    {title: 'ブログ - React Japan'},
    {
        content:
            'React Japanへようこそ！このブログではReactの開発, そして特にRemixフレームワークにフォーカスを当てて、研究 & 考察していきます。',
        name: 'description',
    },
    {content: 'ブログ - React Japan', name: 'twitter:title'},
    {
        content:
            'React Japanへようこそ！このブログではReactの開発, そして特にRemixフレームワークにフォーカスを当てて、研究 & 考察していきます。',
        name: 'twitter:description',
    },
    {content: 'ブログ - React Japan', name: 'og:title'},
    {
        content:
            'React Japanへようこそ！このブログではReactの開発, そして特にRemixフレームワークにフォーカスを当てて、研究 & 考察していきます。',
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
        href: 'https://react-japan.dev/blog',
        hrefLang: 'ja',
        rel: 'alternate',
    },
];

const Blog = () => {
    const articles = useLoaderData<typeof loader>();

    return (
        <Layout>
            <ArticlesGrid articles={articles} className="mt-4" />
        </Layout>
    );
};

export default Blog;
