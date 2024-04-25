import type {MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import ArticlesGrid from '~/components/ArticlesGrid';
import AuthorBlock from '~/components/AuthorBlock';
import Layout from '~/components/Layout';
import {getData} from '~/utils/cache.server';
import {getLocalizedLinks} from '~/utils/http';
import {DRAFTS, parseArticles} from '~/utils/strapi.server';

export {headers} from '~/utils/http.server';

export const loader = async () => {
  const response = await getData(
    `articles?populate=author,hero,tags&populate[1]=author.image${DRAFTS}`,
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
    {
      headers: {
        'Cache-Control':
          'public, maxage=86400, s-maxage=86400, stale-while-revalidate=3600',
      },
    }
  );
};

export const meta: MetaFunction = () => {
  const title = 'React Japan';
  const description =
    'React Japanへようこそ！このブログではReactの開発, そして特にRemixフレームワークにフォーカスを当てて、研究 & 考察していきます。';
  const image = 'https:/react-japan.dev/assets/logo1080.png';

  return [
    {title},
    {content: description, name: 'description'},
    ...getLocalizedLinks(),
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
          <h2 className="text-2xl font-semibold leading-none">記事</h2>
          <ArticlesGrid
            articles={featured}
            className="mt-4"
            isFeatured={true}
          />
          <ArticlesGrid articles={articles} className="mt-12" />
        </section>
        <section className="prose mx-auto text-pretty dark:prose-invert">
          <hr />
          <h1 className="not-prose text-2xl font-semibold">
            このブログについて
          </h1>
          <p>
            React Japanへようこそ！このブログでは&nbsp;
            <a href="https://react.dev/" rel="noreferrer" target="_blank">
              React
            </a>
            &nbsp;の開発, そして特に&nbsp;
            <a href="https://remix.run" rel="noreferrer" target="_blank">
              Remix
            </a>
            &nbsp;フレームワークにフォーカスを当てて、研究 & 考察していきます。
          </p>
          <h2>私たちのミッション</h2>
          <p>
            私たちは価値の高い知識、ベストプラクティスや経験に基づく私たちの考察を共有し、
            日本国内のエンジニアがReact &
            Remix開発業界の世界の最新のトレンドにキャッチアップしていけることです。
          </p>
          <ul>
            <li>Reactへの理解を深めたい</li>
            <li>次のプロジェクトでRemixを使うために学びたい</li>
            <li>開発ワークフロー改善のヒントや手法を学びたい</li>
          </ul>
          <p>
            このような思いがある人へのリソースとなることを目指しています。
            共にRemixを使ったReact開発の可能性を探求していきましょう！
          </p>
          <h2>なぜ Remix なの?</h2>
          <p>
            私たちはRemixがReact開発における最善なフレームワークであると信じています。
            エンジニアの開発体験、パフォーマンス、拡張性に重点を置いたRemixは、
            健全で保守可能で高性能なアプリケーションを構築することができます。
          </p>
          <h2>私たちについて</h2>
          <p>
            私たちはReact &
            Remixに情熱を持つフロントエンドエンジニアのチームです。
            現代のWebアプリケーションを構築する際の課題を理解しており、
            私たちが培ってきた知識と知恵を共有し、エンジニアを力付けることが私たちのパッションです。
          </p>
          <hr className="my-2" />
          <div className="flex flex-col gap-8 py-4">
            <AuthorBlock
              author={{
                id: 1,
                image: '/authors/steven.jpg',
                name: 'Steven Sacks',
                nameKana: 'スティーブン サックス',
                role: 'React Japan 創設者',
              }}
              className="flex-1"
              github="https://github.com/stevensacks"
              locale="ja"
            />
            <AuthorBlock
              author={{
                id: 99,
                image: '/authors/takahiro.jpg',
                name: '長谷川 貴宏',
                role: '寄稿者／翻訳者',
              }}
              className="flex-1"
              github="https://github.com/takahero"
              locale="ja"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
