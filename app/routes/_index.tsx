import type {MetaFunction} from '@remix-run/node';
import Header from '~/components/Header';

export const meta: MetaFunction = () => [
    {title: 'React Japan'},
    {content: 'Welcome to React Japan!', name: 'description'},
];

const Index = () => (
    <div>
        <Header />
    </div>
);

export default Index;
