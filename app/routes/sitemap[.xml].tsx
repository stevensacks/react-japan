import type {ArticleEntry} from '~/types';
import {sitemapLoader} from '~/utils/strapi.server';

export {headers} from '~/utils/http.server';

const getUrl = ({slug, updatedAt}: ArticleEntry, locale = '') => `
  <url>
    <loc>https://react-japan.dev/${locale}blog/${slug}</loc>
    <lastmod>${updatedAt}</lastmod>
    <priority>0.7</priority>
  </url>
`;

export const loader = async () => {
  const {english, japanese} = await sitemapLoader();

  const jaMostRecent = english.at(-1)?.updatedAt ?? '2024-03-30T20:00:00Z';
  const enMostRecent = japanese.at(-1)?.updatedAt ?? '2024-03-30T20:00:00Z';

  const jaUrls = english.map((entry) => getUrl(entry)).join('');
  const enUrls = japanese.map((entry) => getUrl(entry, 'en/')).join('');

  const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
            <loc>https://react-japan.dev</loc>
            <lastmod>${jaMostRecent}</lastmod>
            <priority>1.0</priority>
          </url>
          <url>
            <loc>https://react-japan.dev/en</loc>
            <lastmod>${enMostRecent}</lastmod>
            <priority>1.0</priority>
          </url>
          <url>
            <loc>https://react-japan.dev/blog</loc>
            <lastmod>${jaMostRecent}</lastmod>
            <priority>0.9</priority>
          </url>
          <url>
            <loc>https://react-japan.dev/en/blog</loc>
            <lastmod>${enMostRecent}</lastmod>
            <priority>0.9</priority>
          </url>
          ${jaUrls}
          ${enUrls}
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
