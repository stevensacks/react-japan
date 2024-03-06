export const stripTrailingSlash = (url: string) => {
    if (url !== '/' && url.endsWith('/')) {
        return url.slice(0, -1);
    }

    return url;
};

export const sharedMetaTags = [
    {content: '/assets/logo1080.png', name: 'image'},
    {content: '/assets/logo1080.png', name: 'og:image'},
    {content: '/assets/logo1080.png', name: 'twitter:image'},
    {content: 'summary', name: 'twitter:card'},
    {content: 'React Japan', name: 'og:site_name'},
];
