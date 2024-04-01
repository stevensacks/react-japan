import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import ArticleBlock from '~/components/ArticleBlock';
import BackButton from '~/components/BackButton';
import Layout from '~/components/Layout';
import {convertMarkdownToHtml} from '~/utils/markdown.server';
import {parseArticle} from '~/utils/strapi.server';

export const loader = async ({params}: LoaderFunctionArgs) => {
  const {slug} = params;

  const response = await fetch(
    `${process.env.STRAPI_BASE_URL}/api/articles/${slug}?locale=en&populate=author,hero,tags&populate[1]=author.image`,
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

  const article = parseArticle(data.data);
  const content = await convertMarkdownToHtml(article.content);

  return {...article, content};
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: `${data?.title} - React Japan`},
  {content: data?.excerpt, name: 'description'},
  {
    content: `https://react-japan.dev/en/blog/${data?.slug}`,
    name: 'canonical',
  },
  {content: data?.title, name: 'twitter:title'},
  {content: data?.excerpt, name: 'twitter:description'},
  {content: data?.title, name: 'og:title'},
  {content: data?.excerpt, name: 'og:description'},
  {content: data?.hero, name: 'image'},
  {content: data?.hero, name: 'og:image'},
  {content: data?.hero, name: 'twitter:image'},
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
