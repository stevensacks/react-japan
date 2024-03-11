import type {LinksFunction, MetaFunction} from '@remix-run/node';
import AuthorBlock from '~/components/AuthorBlock';
import Layout from '~/components/Layout';

const title = 'About';
const description =
    'Welcome to React Japan, where we delve into React development, with a special focus on the Remix framework.';

export const meta: MetaFunction = () => [
    {title: `${title} - React Japan`},
    {content: description, name: 'description'},
    {content: title, name: 'twitter:title'},
    {content: description, name: 'twitter:description'},
    {content: title, name: 'og:title'},
    {content: description, name: 'og:description'},
];

export const links: LinksFunction = () => [
    {
        href: 'https://react-japan.dev/about',
        hrefLang: 'ja',
        rel: 'alternate',
    },
    {
        href: 'https://react-japan.dev/en/about',
        hrefLang: 'en',
        rel: 'alternate',
    },
];

const About = () => (
    <Layout className="prose mx-auto dark:prose-invert">
        <h1>About</h1>
        <p>
            Welcome to React Japan, where we delve into&nbsp;
            <a href="https://react.dev/" rel="noreferrer" target="_blank">
                React
            </a>
            &nbsp; development, with a special focus on the&nbsp;
            <a href="https://remix.run" rel="noreferrer" target="_blank">
                Remix
            </a>
            &nbsp; framework.
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
            <AuthorBlock
                author={{
                    id: 1,
                    image: '/authors/steven.jpg',
                    name: 'Steven Sacks',
                    role: 'React Engineer / Architect',
                }}
                className="flex-1"
                github="https://github.com/stevensacks"
                linkedin="https://www.linkedin.com/in/stevensacks/"
            />
            <AuthorBlock
                author={{
                    id: 99,
                    image: '/authors/takahiro.jpg',
                    name: 'Takahiro Hasegawa',
                    role: 'React Developer',
                }}
                className="flex-1"
                github="https://github.com/takahero"
            />
        </div>
    </Layout>
);

export default About;
