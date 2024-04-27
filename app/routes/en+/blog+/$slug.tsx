import type {MetaFunction} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import ArticleBlock from '~/components/ArticleBlock';
import BackButton from '~/components/BackButton';
import Layout from '~/components/Layout';
import {getLocalizedLinks} from '~/utils/http';
import {articleLoader} from '~/utils/strapi.server';

export {headers} from '~/utils/http.server';

export const loader = articleLoader;

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: `${data?.title} - React Japan`},
  {content: data?.excerpt, name: 'description'},
  ...getLocalizedLinks(`/blog/${data?.slug}`, 'en'),
  {content: data?.title, name: 'twitter:title'},
  {content: data?.excerpt, name: 'twitter:description'},
  {content: data?.title, name: 'og:title'},
  {content: data?.excerpt, name: 'og:description'},
  {content: data?.hero, name: 'image'},
  {content: data?.hero, name: 'og:image'},
  {content: data?.hero, name: 'twitter:image'},
];

export const handle = {
  breadcrumb: BackButton,
};

const Blog = () => {
  const article = useLoaderData<typeof loader>();

  return (
    <Layout>
      <ArticleBlock article={article} />
    </Layout>
  );
};

export default Blog;
