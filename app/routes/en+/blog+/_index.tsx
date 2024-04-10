import type {LinksFunction, MetaFunction} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import ArticlesGrid from '~/components/ArticlesGrid';
import Layout from '~/components/Layout';
import {DRAFTS, parseArticles} from '~/utils/strapi.server';

export const loader = async () => {
  const response = await fetch(
    `${process.env.STRAPI_BASE_URL}/api/articles?locale=en&populate=author,hero,tags&populate[1]=author.image${DRAFTS}`,
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

  return parseArticles(data.data).sort((a) =>
    a.slug === 'remix-vs-next' ? -1 : 1
  );
};

export const meta: MetaFunction = () => {
  const title = 'Blog';
  const description =
    'Welcome to React Japan, where we delve into React development, with a special focus on the Remix framework.';
  const image = 'https:/react-japan.dev/assets/logo1080.png';

  return [
    {title: `${title} - React Japan`},
    {content: description, name: 'description'},
    {content: 'https://react-japan.dev/en/blog', name: 'canonical'},
    {content: title, name: 'twitter:title'},
    {content: description, name: 'twitter:description'},
    {content: title, name: 'og:title'},
    {content: description, name: 'og:description'},
    {content: image, name: 'image'},
    {content: image, name: 'og:image'},
    {content: image, name: 'twitter:image'},
  ];
};

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

const Blog = () => {
  const articles = useLoaderData<typeof loader>();

  return (
    <Layout>
      <ArticlesGrid articles={articles} className="mt-4" />
    </Layout>
  );
};

export default Blog;
