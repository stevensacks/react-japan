import {redirect} from '@remix-run/node';
import {getData, invalidate} from '~/utils/cache.server';
import {
  getApiUrl,
  sitemapLoader,
  THIRTY_DAYS_IN_HOURS,
} from '~/utils/strapi.server';

export const loader = async () => {
  invalidate();

  const {english, japanese} = await sitemapLoader();

  const articles = [
    ...japanese.map(({slug}) =>
      getData(
        getApiUrl(false, slug),
        THIRTY_DAYS_IN_HOURS,
        THIRTY_DAYS_IN_HOURS * 2
      )
    ),
    ...english.map(({slug}) =>
      getData(
        getApiUrl(true, slug),
        THIRTY_DAYS_IN_HOURS,
        THIRTY_DAYS_IN_HOURS * 2
      )
    ),
  ];

  await Promise.all(articles);

  throw redirect('/');
};
