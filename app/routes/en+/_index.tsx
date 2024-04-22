import type {MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Link, useLoaderData} from '@remix-run/react';
import {twJoin} from 'tailwind-merge';
import ArticlesGrid from '~/components/ArticlesGrid';
import AuthorBlock from '~/components/AuthorBlock';
import Layout from '~/components/Layout';
import {getLocalizedLinks} from '~/utils/http';
import {DRAFTS, parseArticles} from '~/utils/strapi.server';

export const loader = async () => {
  const response = await fetch(
    `${process.env.STRAPI_BASE_URL}/api/articles?filters[featured][$eq]=true&pagination[pageSize]=5&locale=en&populate=author,hero,tags&populate[1]=author.image${DRAFTS}`,
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

  const articles = parseArticles(data.data).sort((a, b) =>
    a.slug === 'remix-vs-next' ? -1
    : new Date(a.date).getTime() < new Date(b.date).getTime() ? -1
    : 1
  );

  return json(articles, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  });
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
  const articles = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <section className="col-span-1 md:col-span-6 lg:col-span-5 xl:col-span-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold leading-none">
              Featured Articles
            </h2>
            <Link
              className="plain-link rounded-md bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
              to="/en/blog"
            >
              All Articles
            </Link>
          </div>
          <ArticlesGrid
            articles={articles}
            className="mt-4 !grid-cols-1"
            isFeatured={true}
          />
        </section>
        <section
          className={twJoin(
            'prose mx-auto text-pretty dark:prose-invert',

            'max-w-none md:col-span-6 lg:col-span-7 xl:col-span-8'
          )}
        >
          <hr className="md:hidden" />
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
              linkedin="https://www.linkedin.com/in/stevensacks/"
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
