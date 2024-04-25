import {redirect} from '@remix-run/node';
import {invalidate} from '~/utils/cache.server';
import {DRAFTS} from '~/utils/strapi.server';

export const loader = async () => {
  invalidate(
    `articles?populate=author,hero,tags&populate[1]=author.image${DRAFTS}`
  );

  throw redirect('/');
};
