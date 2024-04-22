import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import ArticleBlock from '~/components/ArticleBlock';
import BackButton from '~/components/BackButton';
import Layout from '~/components/Layout';
import {getLocalizedLinks} from '~/utils/http';
import {convertMarkdownToHtml} from '~/utils/markdown.server';
import {DRAFTS, parseArticle} from '~/utils/strapi.server';

export const loader = async ({params}: LoaderFunctionArgs) => {
  const {slug} = params;

  const response = await fetch(
    `${process.env.STRAPI_BASE_URL}/api/articles/${slug}?populate=author,hero,tags&populate[1]=author.image${DRAFTS}`,
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

  const data = await response.json();

  if (data.error) {
    throw new Response('Error loading data from strapi', {status: 500});
  }

  try {
    const article = parseArticle(data.data);
    const content = await convertMarkdownToHtml(article.content);

    return {...article, content};
  } catch {
    throw new Response('', {status: 404, statusText: '見つかりません'});
  }
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: `${data?.title} - React Japan`},
  {content: data?.excerpt, name: 'description'},
  ...getLocalizedLinks(`/blog/${data?.slug}`, '', data?.sourceUrl),
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
    <Layout hideLocaleSwitcher={!!article.sourceUrl}>
      <ArticleBlock article={article} />
    </Layout>
  );
};

export default Blog;
