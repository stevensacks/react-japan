import type {MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import ArticlesGrid from '~/components/ArticlesGrid';
import Layout from '~/components/Layout';
import {getData} from '~/utils/cache.server';
import {getLocalizedLinks} from '~/utils/http';
import {DRAFTS, parseArticles} from '~/utils/strapi.server';

export {headers} from '~/utils/http.server';

export const loader = async () => {
  const response = await getData(
    `articles?locale=en&populate=author,hero,tags&populate[1]=author.image${DRAFTS}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
  );

  if (!response.ok) {
    throw new Response(response.statusText, {status: response.status});
  }

  return json(
    parseArticles(response.data).sort((a, b) =>
      a.slug === 'remix-vs-next' ? -1
      : new Date(a.date).getTime() < new Date(b.date).getTime() ? -1
      : 1
    ),
    {
      headers: {
        'Cache-Control':
          'public, maxage=86400, s-maxage=86400, stale-while-revalidate=3600',
      },
    }
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
    ...getLocalizedLinks('/blog', 'en'),
    {content: title, name: 'twitter:title'},
    {content: description, name: 'twitter:description'},
    {content: title, name: 'og:title'},
    {content: description, name: 'og:description'},
    {content: image, name: 'image'},
    {content: image, name: 'og:image'},
    {content: image, name: 'twitter:image'},
  ];
};

const Blog = () => {
  const articles = useLoaderData<typeof loader>();

  return (
    <Layout>
      <ArticlesGrid articles={articles} />
    </Layout>
  );
};

export default Blog;
