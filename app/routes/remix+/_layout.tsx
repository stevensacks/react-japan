import {Outlet} from '@remix-run/react';
import Layout from '~/components/Layout';

const RemixLayout = () => (
    <Layout>
        <Outlet />
    </Layout>
);

export default RemixLayout;
