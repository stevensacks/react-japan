export const stripTrailingSlash = (url: string) => {
  if (url !== '/' && url.endsWith('/')) {
    return url.slice(0, -1);
  }

  return url;
};

export const getLocalizedLinks = (path = '', language = '') => [
  {
    content: `https://react-japan.dev${language ? '/' : ''}${language}${path}`,
    name: 'canonical',
  },
  {
    href: `https://react-japan.dev${path}`,
    hrefLang: 'ja',
    rel: 'alternate',
    tagName: 'link',
  },
  {
    href: `https://react-japan.dev/en${path}`,
    hrefLang: 'en',
    rel: 'alternate',
    tagName: 'link',
  },
];
