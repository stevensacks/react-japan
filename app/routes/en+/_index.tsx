import type {MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import ArticlesGrid from '~/components/ArticlesGrid';
import AuthorBlock from '~/components/AuthorBlock';
import Layout from '~/components/Layout';
import {getCacheControl, getData} from '~/utils/cache.server';
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

  const articles = parseArticles(response.data).sort((a, b) =>
    a.slug === 'remix-vs-next' ? -1
    : new Date(a.date).getTime() < new Date(b.date).getTime() ? -1
    : 1
  );

  return json(
    {
      articles: articles.filter((article) => !article.featured),
      featured: articles.filter((article) => article.featured),
    },
    {headers: getCacheControl()}
  );
};

export const meta: MetaFunction = () => {
  const title = 'React Japan';
  const description =
    'Welcome to React Japan, where we delve into React development, with a special focus on the Remix framework.';
  const image = 'https:/react-japan.dev/assets/logo1080.png';

  return [
    {title},
    {content: description, name: 'description'},
    ...getLocalizedLinks('', 'en'),
    {content: title, name: 'twitter:title'},
    {content: description, name: 'twitter:description'},
    {content: title, name: 'og:title'},
    {content: description, name: 'og:description'},
    {content: image, name: 'image'},
    {content: image, name: 'og:image'},
    {content: image, name: 'twitter:image'},
  ];
};

const Index = () => {
  const {articles, featured} = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="space-y-12">
        <section className="container mx-auto">
          <h2 className="text-2xl font-bold leading-none">Articles</h2>
          <ArticlesGrid
            articles={featured}
            className="mt-4"
            isFeatured={true}
          />
          <ArticlesGrid articles={articles} className="mt-8" />
        </section>
        <section className="prose mx-auto text-pretty dark:prose-invert">
          <hr />
          <h1 className="not-prose text-2xl font-bold">About</h1>
          <p>
            Welcome to React Japan, where we delve into&nbsp;
            <a href="https://react.dev/" rel="noreferrer" target="_blank">
              React
            </a>
            &nbsp;development, with a special focus on the&nbsp;
            <a href="https://remix.run" rel="noreferrer" target="_blank">
              Remix
            </a>
            &nbsp;framework.
          </p>
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide valuable knowledge, share best practices
            and insights, and keep engineers in Japan up-to-date with the latest
            trends in the world of React and Remix development.
          </p>
          <p>
            Whether you&apos;re looking to deepen your understanding of React
            concepts, learn about using Remix to build your next site, or
            discover tips and tricks for improving your workflow, our goal is to
            be your go-to resource. Join us on this exciting journey as we
            explore the possibilities of React development with Remix.
          </p>
          <h2>Why Remix?</h2>
          <p>
            We believe Remix is the best framework for React development. With
            its emphasis on developer experience, performance, and scalability,
            Remix enables developers to build robust, maintainable, and high
            performance applications.
          </p>
          <h2>Who We Are</h2>
          <p>
            We are front-end engineers who are passionate about React and Remix.
            We understand the challenges developers face when building modern
            web applications, and we are dedicated to sharing our knowledge and
            expertise to empower fellow engineers.
          </p>
          <hr className="my-2" />
          <div className="flex flex-col gap-8 py-4">
            <AuthorBlock
              author={{
                id: 1,
                image: '/authors/steven.jpg',
                name: 'Steven Sacks',
                role: 'React Japan Founder',
              }}
              className="flex-1"
              github="https://github.com/stevensacks"
            />
            <AuthorBlock
              author={{
                id: 99,
                image: '/authors/takahiro.jpg',
                name: 'Takahiro Hasegawa',
                role: 'Contributor / Translator',
              }}
              className="flex-1"
              github="https://github.com/takahero"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
