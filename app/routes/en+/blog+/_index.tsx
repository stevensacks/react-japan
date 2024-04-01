import type {LinksFunction, MetaFunction} from '@remix-run/node';
import Layout from '~/components/Layout';

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

const Blog = () => (
  <Layout>
    <div />
  </Layout>
);

export default Blog;
