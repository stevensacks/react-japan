import type {MetaFunction} from '@remix-run/node';
import Layout from '~/components/Layout';

export const meta: MetaFunction = () => [
    {title: 'About - React Japan'},
    {content: 'Welcome to React Japan!', name: 'description'},
];

const Index = () => (
    <Layout className="prose prose-invert mx-auto">
        <h1>About</h1>
        <p>
            Welcome to React Japan, where we delve into{' '}
            <a href="https://react.dev/" rel="noreferrer" target="_blank">
                React
            </a>{' '}
            development, with a special focus on the{' '}
            <a href="https://remix.run" rel="noreferrer" target="_blank">
                Remix
            </a>{' '}
            framework.
        </p>
        <h2>Our Mission</h2>
        <p>
            Our mission is to provide valuable knowledge, share best practices
            and insights, and keep engineers in Japan up-to-date with the latest
            trends in the world of React and Remix development.
        </p>
        <p>
            Whether you&apos;re looking to deepen your understanding of React
            concepts, learn about using Remix to build your next site, or
            discover tips and tricks for improving your workflow, our goal is to
            be your go-to resource. Join us on this exciting journey as we
            explore the possibilities of React development with Remix.
        </p>
        <h2>Why Remix?</h2>
        <p>
            We believe Remix is the best framework for React development. With
            its emphasis on developer experience, performance, and scalability,
            Remix enables developers to build robust, maintainable, and high
            performance applications.
        </p>
        <h2>Who We Are</h2>
        <p>
            We are front-end engineers who are passionate about React and Remix.
            We understand the challenges developers face when building modern
            web applications, and we are dedicated to sharing our knowledge and
            expertise to empower fellow engineers.
        </p>
        <div className="flex flex-1 items-end">
            <div className="flex items-center gap-4">
                <div className="overflow-hidden rounded-full">
                    <img
                        alt="Steven Sacks"
                        className="m-0 size-8 sm:size-12 md:size-16"
                        src="/authors/steven.jpg"
                    />
                </div>
                <div>
                    <div className="text-lg font-bold leading-none sm:text-xl sm:leading-tight md:text-3xl">
                        Steven Sacks
                    </div>
                    <div className="leading-none text-white/50 sm:leading-tight">
                        React Engineer / Architect
                        <br />
                        Remix and Storybook contributor
                    </div>
                </div>
            </div>
        </div>
    </Layout>
);

export default Index;
