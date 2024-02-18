import type {MetaFunction} from '@remix-run/node';
import Author from '~/components/Author';
import Layout from '~/components/Layout';

export const meta: MetaFunction = () => [
    {title: 'React Japan'},
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
        <hr className="my-0" />
        <div className="flex flex-col gap-8 py-4">
            <Author
                className="flex-1"
                github="https://github.com/stevensacks"
                image="/authors/steven.jpg"
                linkedin="https://www.linkedin.com/in/stevensacks/"
                name="Steven Sacks"
                role="React Engineer / Architect"
            />
            <Author
                className="flex-1"
                github="https://github.com/takahero"
                image="/authors/takahiro.jpg"
                name="Takahiro Hasegawa"
                role="React Developer"
            />
        </div>
    </Layout>
);

export default Index;
