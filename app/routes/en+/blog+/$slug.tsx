import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import ArticleBlock from '~/components/ArticleBlock';
import BackButton from '~/components/BackButton';
import Layout from '~/components/Layout';
import {getCacheControl, getData} from '~/utils/cache.server';
import {getLocalizedLinks} from '~/utils/http';
import {convertMarkdownToHtml} from '~/utils/markdown.server';
import {DRAFTS, parseArticle} from '~/utils/strapi.server';

export {headers} from '~/utils/http.server';

export const loader = async ({params}: LoaderFunctionArgs) => {
  const {slug} = params;

  const response = await getData(
    `articles/${slug}?locale=en&populate=author,hero,tags&populate[1]=author.image${DRAFTS}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
    336,
    672
  );

  if (!response.ok) {
    throw new Response(response.statusText, {status: response.status});
  }

  try {
    const article = parseArticle(response.data);
    const content = await convertMarkdownToHtml(article.content);

    return json(
      {...article, content},
      {headers: getCacheControl(604_800, 86_400)}
    );
  } catch {
    throw new Response('', {status: 404, statusText: 'Not found'});
  }
};

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
