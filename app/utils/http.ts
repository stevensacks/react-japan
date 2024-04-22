export const stripTrailingSlash = (url: string) => {
  if (url !== '/' && url.endsWith('/')) {
    return url.slice(0, -1);
  }

  return url;
};

export const getLocalizedLinks = (path = '', language = '', sourceUrl = '') => [
  {
    content: `https://react-japan.dev${language ? '/' : ''}${language}${path}`,
    rel: 'canonical',
    tagName: 'link',
  },
  {
    href: `https://react-japan.dev${path}`,
    hrefLang: 'ja',
    rel: 'alternate',
    tagName: 'link',
  },
  {
    href: sourceUrl || `https://react-japan.dev/en${path}`,
    hrefLang: 'en',
    rel: 'alternate',
    tagName: 'link',
  },
];
