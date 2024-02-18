import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import Layout from '~/components/Layout';
import i18next from '~/i18next.server';

export const loader = async ({request}: LoaderFunctionArgs) => {
    const t = await i18next.getFixedT(request, ['common']);
    const title = t('meta.title');
    const description = t('meta.description');

    return json({description, title});
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
    {title: data?.title},
    {
        content: data?.description,
        name: 'description',
    },
];

const Index = () => (
    <Layout>
        <h1 className="text-4xl">Home</h1>
    </Layout>
);

export default Index;
