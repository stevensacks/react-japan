import {getData} from '~/utils/cache.server';
import type {ArticleEntry} from '~/utils/strapi.server';
import {parseEntries} from '~/utils/strapi.server';

export {headers} from '~/utils/http.server';

const getEntry = ({slug, updatedAt}: ArticleEntry, locale = '') => `
    <url>
        <loc>https://react-japan.dev/${locale}blog/${slug}</loc>
        <lastmod>${updatedAt}</lastmod>
        <priority>0.7</priority>
    </url>
`;

export const loader = async () => {
  const jaResponse = await getData(
    'articles',
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
    6
  );

  if (!jaResponse.ok) {
    throw jaResponse;
  }

  const enResponse = await getData(
    'articles?locale=en',
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
    6
  );

  if (!enResponse.ok) {
    throw enResponse;
  }

  const jaData = await jaResponse.json();
  const enData = await enResponse.json();

  if (jaData.error || enData.error) {
    throw new Response('Error loading data from strapi', {status: 500});
  }

  const jaEntries = parseEntries(jaData.data)
    .map((entry) => getEntry(entry))
    .join('');

  const enEntries = parseEntries(enData.data)
    .map((entry) => getEntry(entry, 'en/'))
    .join('');

  const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://react-japan.dev</loc>
                <lastmod>2024-03-30T20:00:00Z</lastmod>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>https://react-japan.dev/en</loc>
                <lastmod>2024-03-30T20:00:00Z</lastmod>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>https://react-japan.dev/blog</loc>
                <lastmod>2024-03-30T20:00:00Z</lastmod>
                <priority>0.9</priority>
            </url>
            <url>
                <loc>https://react-japan.dev/en/blog</loc>
                <lastmod>2024-03-30T20:00:00Z</lastmod>
                <priority>0.9</priority>
            </url>
            ${jaEntries}
            ${enEntries}
        </urlset>
    `.trim();

  return new Response(content, {
    headers: {
      'Cache-Control':
        'public, maxage=86400, s-maxage=86400, stale-while-revalidate=21600',
      'Content-Type': 'application/xml',
      encoding: 'UTF-8',
      'xml-version': '1.0',
    },
    status: 200,
  });
};
