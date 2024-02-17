import type {MetaFunction} from '@remix-run/node';
import Layout from '~/components/Layout';

export const meta: MetaFunction = () => [
    {title: 'About - React Japan'},
    {content: 'Welcome to React Japan!', name: 'description'},
];

const Index = () => (
    <Layout className="prose prose-invert mx-auto">
        <h1>About us</h1>
        <p>
            Welcome to React Japan, where we delve into the intricacies of{' '}
            <a href="https://react.dev/" rel="noreferrer" target="_blank">
                React
            </a>{' '}
            development, with a special focus on the{' '}
            <a href="https://remix.run" rel="noreferrer" target="_blank">
                Remix
            </a>{' '}
            framework.
        </p>
        <p>
            Whether you&apos;re a seasoned engineer or just starting your
            journey in web development, our goal is to provide valuable
            insights, tutorials, and best practices to help you master React and
            leverage Remix effectively.
        </p>
        <p>
            Our team is passionate about React and its ecosystem. We understand
            the challenges developers face when building modern web
            applications, and we&apos;re dedicated to sharing our knowledge and
            expertise to empower fellow engineers.
        </p>
        <p>
            Why Remix? As advocates for innovation and efficiency, we believe
            Remix offers a fresh approach to web development, combining the best
            of server-rendered and client-rendered frameworks. With its emphasis
            on developer experience, performance, and scalability, Remix enables
            developers to build robust, maintainable, and high performance
            applications.
        </p>
        <p>
            Our target audience primarily consists of engineers in Japan, but
            our content is crafted to be accessible to developers worldwide. We
            understand the importance of language diversity, which is why we
            publish our articles in both English and Japanese. By breaking
            language barriers, we aim to foster a vibrant community where
            knowledge knows no bounds.
        </p>
        <p>
            Whether you&apos;re looking to deepen your understanding of React
            concepts, explore the latest features in Remix, or discover tips and
            tricks for improving your workflow, our blog is your go-to resource.
            Join us on this exciting journey as we explore the limitless
            possibilities of React development with Remix.
        </p>
        <p>Thank you for visiting, and happy coding!</p>
        <p>- The React Japan Team</p>
        <hr />
        <h1>私たちについて</h1>
        <p>
            私たちの
            <a href="https://react.dev/" rel="noreferrer" target="_blank">
                React
            </a>
            ブログへようこそ。ここでは、React開発の微細な部分について深く掘り下げ、特に
            <a href="https://remix.run" rel="noreferrer" target="_blank">
                Remix
            </a>
            フレームワークに焦点を当てています。あなたが経験豊富なエンジニアであるか、ウェブ開発の旅を始めたばかりであっても、私たちの目標は、Reactをマスターし、Remixを効果的に活用するための貴重な知識、チュートリアル、ベストプラクティスを提供することです。
        </p>
        <p>
            私たちのチームは、Reactとそのエコシステムに情熱を持っています。モダンなウェブアプリケーションを構築する際に開発者が直面する課題を理解し、私たちの知識と専門知識を共有することに情熱を注いでいます。
        </p>
        <p>
            なぜRemixなのでしょうか？私たちは革新と効率性の提唱者として、Remixがサーバー側とクライアント側のフレームワークのベストを組み合わせた新しいアプローチを提供していると信じています。開発者エクスペリエンス、パフォーマンス、拡張性に重点を置いたRemixは、ユーザーを喜ばせる堅牢で保守可能なアプリケーションを構築することを可能にします。
        </p>
        <p>
            私たちのターゲットオーディエンスは主に日本のエンジニアですが、私たちのコンテンツは世界中の開発者にもアクセス可能なように作成されています。私たちの記事は英語と日本語の両方で公開されています。言語の壁を取り除くことで、知識が制限されない活発なコミュニティを育成することを目指しています。
        </p>
        <p>
            Reactの概念を深めたり、Remixの最新機能を探求したり、ワークフローを改善するためのヒントやトリックを発見したりしたい場合、私たちのブログがお役に立ちます。私たちと一緒に、React開発とRemixの無限の可能性を探求するこのエキサイティングな旅に参加してください。
        </p>
        <p>訪問していただき、ありがとうございます。</p>
        <p>- React Japan チーム</p>
    </Layout>
);

export default Index;
