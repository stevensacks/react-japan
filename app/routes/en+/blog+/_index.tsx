import type {MetaFunction} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import ArticlesGrid from '~/components/ArticlesGrid';
import Layout from '~/components/Layout';
import {getLocalizedLinks} from '~/utils/http';
import {blogLoader} from '~/utils/strapi.server';

export {headers} from '~/utils/http.server';

export const loader = blogLoader;

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
  const {articles} = useLoaderData<typeof loader>();

  return (
    <Layout>
      <ArticlesGrid articles={articles} />
    </Layout>
  );
};

export default Blog;
