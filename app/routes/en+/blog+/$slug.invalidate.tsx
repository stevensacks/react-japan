import type {LoaderFunctionArgs} from '@remix-run/node';
import {redirect} from '@remix-run/node';
import {invalidate} from '~/utils/cache.server';
import {DRAFTS} from '~/utils/strapi.server';

export {headers} from '~/utils/http.server';

export const loader = async ({params}: LoaderFunctionArgs) => {
  const {slug} = params;

  invalidate(
    `/articles/${slug}?locale=en&populate=author,hero,tags&populate[1]=author.image${DRAFTS}`
  );

  throw redirect(`/en/blog/${slug}`);
};
