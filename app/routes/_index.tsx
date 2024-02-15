import type {MetaFunction} from '@remix-run/node';

export const meta: MetaFunction = () => [
    {title: 'React Japan'},
    {content: 'Welcome to React Japan!', name: 'description'},
];

const Index = () => (
    <div>
        <h1 className="text-3xl">Welcome to Remix</h1>
        <ul>
            <li>
                <a
                    href="https://remix.run/tutorials/blog"
                    rel="noreferrer"
                    target="_blank"
                >
                    15m Quickstart Blog Tutorial
                </a>
            </li>
            <li>
                <a
                    href="https://remix.run/tutorials/jokes"
                    rel="noreferrer"
                    target="_blank"
                >
                    Deep Dive Jokes App Tutorial
                </a>
            </li>
            <li>
                <a
                    href="https://remix.run/docs"
                    rel="noreferrer"
                    target="_blank"
                >
                    Remix Docs
                </a>
            </li>
        </ul>
    </div>
);

export default Index;
