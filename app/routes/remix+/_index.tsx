import type {MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Link} from '@remix-run/react';
import Layout from '~/components/Layout';
import RemixLogo from '~/components/RemixLogo';

export const loader = async () => {
    const title = 'Remix - React Japan';
    const description = 'Welcome to React Japan!';

    return json({
        description,
        title,
    });
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
    {title: data?.title},
    {
        content: data?.description,
        name: 'description',
    },
];

const RemixRoute = () => (
    <Layout>
        <RemixLogo className="h-16" />
        <ul className="mt-4 space-y-4">
            <Link prefetch="intent" to="/remix/remix-vs-next">
                Remix vs Next.JS
            </Link>
        </ul>
    </Layout>
);

export default RemixRoute;
