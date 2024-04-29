import type {LoaderFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';
import type {Article, ArticleEntry, StrapiArticle} from '~/types';
import {getCacheControl, getData} from '~/utils/cache.server';
import {convertMarkdownToHtml} from '~/utils/markdown.server';

const getImagePath = (path: string) =>
  process.env.NODE_ENV === 'development' ? new URL(path).pathname : path;

export const parseArticle = (article: StrapiArticle): Article => ({
  author: {
    id: article.attributes.author.data.id,
    image: getImagePath(article.attributes.author.data.attributes.image),
    name: article.attributes.author.data.attributes.name,
    nameKana: article.attributes.author.data.attributes.nameKana,
    role: article.attributes.author.data.attributes.role,
  },
  content: article.attributes.content,
  date: article.attributes.date,
  excerpt: article.attributes.excerpt,
  featured: article.attributes.featured,
  hero: getImagePath(article.attributes.hero),
  id: article.id,
  locale: article.attributes.locale,
  slug: article.attributes.slug,
  sourceUrl: article.attributes.sourceUrl,
  tags: article.attributes.tags.data?.map((tag) => ({
    id: tag.id,
    name: tag.attributes.name,
    slug: tag.attributes.slug,
  })),
  title: article.attributes.title,
});

export const parseAndSortArticles = (articles: Array<StrapiArticle>) =>
  articles
    .filter((article) => article.attributes.author.data?.id)
    .map(parseArticle)
    .sort((a, b) =>
      a.slug === 'remix-vs-next' ?
        -1
      : new Date(a.date).getTime() - new Date(b.date).getTime()
    );

export const parseAndSortArticleEntries = (
  articles: Array<StrapiArticle>
): Array<ArticleEntry> =>
  articles
    .map(({attributes: {slug, updatedAt}}) => ({slug, updatedAt}))
    .sort(
      (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    );

export const DRAFTS =
  process.env.NODE_ENV === 'development' ? '&publicationState=preview' : '';

export const getApiUrl = (isEnglish = false, slug = '') =>
  `articles${slug ? '/' : ''}${slug}?${isEnglish ? 'locale=en&' : ''}populate=author,hero,tags&populate[1]=author.image${DRAFTS}`;

export const THIRTY_DAYS_IN_HOURS = 720;

export const blogLoader = async ({request}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const isEnglish = url.pathname.startsWith('/en');

  const response = await getData(
    getApiUrl(isEnglish),
    THIRTY_DAYS_IN_HOURS,
    THIRTY_DAYS_IN_HOURS * 2
  );

  if (!response.ok) {
    throw new Response(response.statusText, {status: response.status});
  }

  try {
    const articles = parseAndSortArticles(response.data);
    const isIndex = isEnglish ? url.pathname === '/en' : url.pathname === '/';

    return json(
      isIndex ?
        {
          articles: articles.filter(({featured}) => !featured),
          featured: articles.filter(({featured}) => featured),
        }
      : {articles, featured: []},
      {
        headers: getCacheControl(),
      }
    );
  } catch {
    throw new Response('', {
      status: 404,
      statusText: isEnglish ? 'Not found' : '見つかりません',
    });
  }
};

export const articleLoader = async ({params, request}: LoaderFunctionArgs) => {
  const {slug} = params;
  const url = new URL(request.url);
  const isEnglish = url.pathname.startsWith('/en');

  const ttlHours = slug ? THIRTY_DAYS_IN_HOURS * 2 : THIRTY_DAYS_IN_HOURS;

  const response = await getData(
    getApiUrl(isEnglish, slug),
    ttlHours,
    ttlHours * 2
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
    throw new Response('', {
      status: 404,
      statusText: isEnglish ? 'Not found' : '見つかりません',
    });
  }
};

export const sitemapLoader = async () => {
  const jaResponse = await getData(
    getApiUrl(),
    THIRTY_DAYS_IN_HOURS,
    THIRTY_DAYS_IN_HOURS * 2
  );

  if (!jaResponse.ok) {
    throw new Response(jaResponse.statusText, {status: jaResponse.status});
  }

  const enResponse = await getData(
    getApiUrl(true),
    THIRTY_DAYS_IN_HOURS,
    THIRTY_DAYS_IN_HOURS * 2
  );

  if (!enResponse.ok) {
    throw new Response(enResponse.statusText, {status: enResponse.status});
  }

  if (jaResponse.error || enResponse.error) {
    throw new Response('Error loading data from strapi', {status: 500});
  }

  return {
    english: parseAndSortArticleEntries(enResponse.data),
    japanese: parseAndSortArticleEntries(jaResponse.data),
  };
};
