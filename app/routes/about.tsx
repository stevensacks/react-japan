import type {MetaFunction} from '@remix-run/node';
import Layout from '~/components/Layout';

export const meta: MetaFunction = () => [
    {title: 'About - React Japan'},
    {content: 'Welcome to React Japan!', name: 'description'},
];

const Index = () => (
    <Layout>
        <h1 className="text-4xl">About</h1>
    </Layout>
);

export default Index;
