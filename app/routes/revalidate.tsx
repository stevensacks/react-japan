import {redirect} from '@remix-run/node';
import {getData, invalidate} from '~/utils/cache.server';
import {
  getApiUrl,
  ONE_WEEK_IN_HOURS,
  sitemapLoader,
} from '~/utils/strapi.server';

export const loader = async () => {
  invalidate();

  const {english, japanese} = await sitemapLoader();

  const articles = [
    ...japanese.map(({slug}) =>
      getData(getApiUrl(false, slug), ONE_WEEK_IN_HOURS, ONE_WEEK_IN_HOURS * 2)
    ),
    ...english.map(({slug}) =>
      getData(getApiUrl(true, slug), ONE_WEEK_IN_HOURS, ONE_WEEK_IN_HOURS * 2)
    ),
  ];

  await Promise.all(articles);

  throw redirect('/');
};
