import type {MetaFunction} from '@remix-run/node';
import Author from '~/components/Author';
import Layout from '~/components/Layout';

export const meta: MetaFunction = () => [
    {title: 'React Japan'},
    {content: 'React Japanへようこそ！', name: 'description'},
];

const Index = () => (
    <Layout className="prose prose-invert mx-auto">
        <h1>このブログについて</h1>
        <p>
            React Japanへようこそ！このブログでは{' '}
            <a href="https://react.dev/" rel="noreferrer" target="_blank">
                React
            </a>{' '}
            の開発, そして特に{' '}
            <a href="https://remix.run" rel="noreferrer" target="_blank">
                Remix
            </a>{' '}
            フレームワークにフォーカスを当てて、研究 & 考察していきます。
        </p>
        <h2>私たちのミッション</h2>
        <p>
            私たちは価値の高い知識、ベストプラクティスや経験に基づく私たちの考察を共有し、
            日本国内のエンジニアがReact & Remix
            開発業界の世界の最新のトレンドにキャッチアップしていけることです。
            <ul>
                <li>Reactへの理解を深めたい</li>
                <li>次のプロジェクトでRemixを使うために学びたい</li>
                <li>開発ワークフロー改善のヒントや手法を学びたい</li>
                <li>
                    このような思いがある人へのリソースとなることを目指しています。
                </li>
                <li>
                    共にRemixを使ったReact開発の可能性を探求していきましょう！
                </li>
            </ul>
        </p>
        <h2>なぜ Remix なの?</h2>
        <p>
            私たちはRemixがReact開発における最善なフレームワークであると信じています。
            エンジニアの開発体験、パフォーマンス、拡張性に重点を置いたRemixは、
            健全で保守可能で高性能なアプリケーションを構築することができます。
        </p>
        <h2>私たちについて</h2>
        <p>
            私たちはReact &
            Remixに情熱を持つフロントエンドエンジニアのチームです。
            現代のWebアプリケーションを構築する際の課題を理解しており、
            私たちが培ってきた知識と知恵を共有し、エンジニアを力付けることが私たちのパッションです。
        </p>
        <hr className="my-0" />
        <div className="flex flex-col gap-8 py-4">
            <Author
                className="flex-1"
                github="https://github.com/stevensacks"
                image="/authors/steven.jpg"
                linkedin="https://www.linkedin.com/in/stevensacks/"
                name="Steven Sacks"
                nameKana="スティーブン サックス"
                role="React エンジニア / アーキテクト"
            />
            <Author
                className="flex-1"
                github="https://github.com/takahero"
                image="/authors/takahiro.jpg"
                name="長谷川　貴宏"
                role="React 開発者"
            />
        </div>
    </Layout>
);

export default Index;
