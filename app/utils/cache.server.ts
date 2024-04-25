import type {Cache, CacheEntry} from '@epic-web/cachified';
import {cachified, totalTtl} from '@epic-web/cachified';
import {LRUCache} from 'lru-cache';

const lruInstance = new LRUCache<string, CacheEntry>({max: 1000});

const lru: Cache = {
  delete: (key) => lruInstance.delete(key),
  get: (key) => lruInstance.get(key),
  set: (key, value) => {
    const ttl = totalTtl(value?.metadata);

    return lruInstance.set(key, value, {
      start: value?.metadata?.createdTime,
      ttl: ttl === Number.POSITIVE_INFINITY ? undefined : ttl,
    });
  },
};

const HOUR = process.env.NODE_ENV === 'production' ? 1000 * 60 * 60 : 1000;

export const getData = (
  path: string,
  options?: RequestInit,
  ttlHours = 1,
  swrHours = 24
) =>
  cachified({
    cache: lru,
    forceFresh: process.env.NODE_ENV === 'development',
    getFreshValue: async (context) => {
      const response = await fetch(
        `${process.env.STRAPI_BASE_URL}/api/${path}`,
        options
      );

      if (!response.ok) {
        if (response.status !== 404) {
          context.metadata.ttl = -1;
        }

        return {ok: false, status: 404};
      }

      const data = await response.json();

      if (data.error) {
        context.metadata.ttl = -1;

        return {
          ok: false,
          status: 500,
          statusText: 'Error loading data from strapi',
        };
      }

      return {ok: true, ...data};
    },
    key: path,
    staleWhileRevalidate: HOUR * swrHours,
    ttl: HOUR * ttlHours,
  });

export const invalidate = (url: string) => {
  lru.delete(url);
};
