import type {MetaFunction} from '@remix-run/node';
import Layout from '~/components/Layout';

export const meta: MetaFunction = () => [
    {title: 'About - React Japan'},
    {content: 'Welcome to React Japan!', name: 'description'},
];

const Index = () => (
    <Layout className="prose prose-invert mx-auto">
        <h1>このブログについて</h1>
        <p>
            React Japanへようこそ
            このブログでは{' '}
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
            日本国内のエンジニアがReact & Remix 開発業界の世界の最新のトレンドにキャッチアップしていけることです。
        </p>
        <p>
            - Reactへの理解を深めたい
            - 次のプロジェクトでRemixを使うために学びたい
            - 開発ワークフロー改善のヒントや手法を学びたい

            このような思いがある人へのリソースとなることを目指しています。

            共にRemixを使ったReact開発の可能性を探求していきましょう！
        </p>
        <h2>なぜ Remix なの?</h2>
        <p>
            私たちはRemixがReact開発における最善なフレームワークであると信じています。
            エンジニアの開発体験、パフォーマンス、拡張性に重点を置いたRemixは、
            健全で保守可能で高性能なアプリケーションを構築することができます。
        </p>
        <h2>私たちについて</h2>
        <p>
            私たちはReact & Remixに情熱を持つフロントエンドエンジニアのチームです。
            現代のWebアプリケーションを構築する際の課題を理解しており、
            私たちが培ってきた知識と知恵を共有し、エンジニアを力付けることが私たちのパッションです。
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
                        Steven Sacks (スティーブン サックス)
                    </div>
                    <div className="leading-none text-white/50 sm:leading-tight">
                        React エンジニア / アーキテクト
                        <br />
                        Remix & Storybook コントリビューター
                    </div>
                </div>
            </div>
        </div>
    </Layout>
);

export default Index;
