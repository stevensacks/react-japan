export const loader = () => {
    const robotText = `
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /

Sitemap: https://react-japan.dev/sitemap.xml
`;

    return new Response(robotText, {
        headers: {
            /*'Cache-Control':
                'public, s-maxage=604800, stale-while-revalidate=86400',*/
            'Content-Type': 'text/plain',
        },
        status: 200,
    });
};
