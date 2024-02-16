import type {MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';

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
    <div>
        <h2>Remix section goes here</h2>
    </div>
);

export default RemixRoute;
