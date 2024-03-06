export const isProductionHost = (request: Request) =>
    request.headers.get('host') === 'react-japan.dev';
