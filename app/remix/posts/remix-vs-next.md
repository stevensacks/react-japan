---
title: Remix vs Next.js
summary: RemixとNext.jsの客観的な比較
featured: false
date: 2022-01-11
image: /blog-images/headers/remix-vs-next.jpg
imageAlt: RemixとNext.jsのロゴ
authors:
    - Ryan Florence
---

私たちに寄せられる最も大きな質問は次のようなものです：

> RemixはNext.jsとどう違うのですか？

この質問に答える必要があるようです！私たちは直接的かつドラマを持たずにそれに対処したいと思っています。Remixのファンで、この記事に対して自慢げなリアクションをツイートしたい場合は、ツイートボタンを押す前に自慢をやめていただくようお願いします 🤗。高潮は全ての船を浮かび上がらせます。私たちはVercelのメンバーとはVercelが設立される前から友人です。彼らは素晴らしい仕事をしており、私たちは彼らの仕事を尊重しています！

しかし、間違いなく **RemixはNext.jsよりも優れたトレードオフを持っていると考えています**。<small>(そうでなければ、私たちはそれを作りませんでした...)</small>

この記事全体をお読みいただくことをお勧めします。この会話には、光沢のあるグラフやアニメーションでは捉えきれない微妙なニュアンスがたくさんあります。最終的には、Remixを次のプロジェクトに検討していただけると嬉しいです (もちろん、ダジャレは意図していません 😂)。

## 要約

- Remixは静的コンテンツの提供においてNext.jsと同等またはそれ以上の速さです
- Remixは動的コンテンツの提供においてNext.jsよりも速いです
- Remixは遅いネットワークでも高速なユーザーエクスペリエンスを実現します
- Remixはエラーや中断、競合状態を自動的に処理しますが、Next.jsはそうではありません
- Next.jsは動的コンテンツの提供にクライアントサイドのJavaScriptを推奨しますが、Remixはそうしません
- Next.jsはデータの変更にクライアントサイドのJavaScriptが必要ですが、Remixは必要ありません
- Next.jsのビルド時間はデータとともに線形に増加しますが、Remixのビルド時間はほぼ即座であり、データとは切り離されています
- Next.jsはデータがスケールするとアプリケーションのアーキテクチャを変更し、パフォーマンスを犠牲にする必要があります
- 私たちはRemixの抽象化がより優れたアプリケーションコードにつながると考えています

## 背景

フレームワークを比較する最も公平な方法は、Vercelチーム自身が書いたNext.jsのサンプルアプリを取り上げることです。彼らが書いたものは、あなたがアプリを構築する際にどのように意図されているかを反映しているはずです。また、Vercelチームが最も自信を持っている機能を紹介するはずです。

私たちは、Next.jsの[examples page][next-examples]から_Commerce Example_を移植しました。これには、私たちが好きないくつかの実世界の機能があり、最も力を入れたもののようです。

- Eコマースにとって初期のページ読み込みは重要です
- 検索ページの動的データ
- ショッピングカートでのデータ変更
- フレームワークが抽象化を助ける方法を示す複数のプロバイダーとの統合の可能性

実際に2つのバージョンを作成しました：

- **Minimal Port** - Next.jsのコードを単純にコピー/貼り付け/調整して、Next.jsの代わりにRemixで実行するようにしました。これはNext.jsのデモと同じようにVercelにデプロイされます。フレームワーク以外はすべて同じなので、フレームワークの比較には最適です。
- **Rewrite** - 2つのフレームワークには実際には多くのAPIのオーバーラップがなく、RemixはNext.jsとは異なるインフラストラクチャで実行できます。Remixの設計を本当に活用するために、例をRemixの独自の形式に書き直し、アプリにはクイックな画像最適化ルートも組み込みましたので、100% Remixです。

このアプリでは、Remixについて私たちがクールだと思っているすべての機能（ネストされたルートなど）を活用することはできません。この質問に答えた後は、Remixについて話すだけに移行することができますので、お楽しみに！

さらに、この記事を公開する前にVercelと共有しました。実際、彼らの例は古いバージョンのNext.jsで実行されていましたが、彼らはそれを更新しましたので、私たちは最新の例と比較するために時間をかけて再構築しました。

## 本当に、私たちはVercelが好きです

私たちは彼らを友人と考えており、VercelはRemixの優れたデプロイ先ですので、パートナーでもあります。私はRemixアプリを聞いたことのあるほとんどすべてのホスティングサービスにデプロイしてきましたが、Vercelの開発者体験は私のお気に入りです。"Develop, Preview, Ship"という言葉には実際の効果があります。たとえば、今朝は[@gt_codes](https://twitter.com/gt_codes)と私がプロダクションのバグを解決しようとしていて、各プレビューデプロイメントが利用可能で、それぞれのスクリーンショットがあるので、数秒で問題のあるコミットを見つけることができました。素晴らしいです。

今では面白い関係です。私たちはただの友人やテクノロジーパートナーではなく、フレームワークの競争相手でもあります！ですので、私たちの友人、パートナー、競争相手であるVercelに対して、Leeはこの記事の背後にある動機を素晴らしく表現しています：

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">DevToolsに競争があると、開発者が勝つ：<br><br>◆ SvelteはReactを推進<br>◆ RemixはNext.jsを推進<br>◆ PrismaはORMを推進<br>◆ DenoはNode.jsを推進<br>◆ SupabaseはFirebaseを推進<br>◆ esbuild / SWCはJSツールを推進<br>◆ BunはSWCを推進<br><br>他には何がありますか？</p>&mdash; Lee Robinson (@leeerob) <a href="https://twitter.com/leeerob/status/1465702417513680897?ref_src=twsrc%5Etfw">2021年11月30日</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

この記事をその文脈で読んでください。さあ、推進しましょう！

## 自己紹介

私は、それを構築した人々がそれをどのように説明するかで、多くのことを知ることができると思います。<small>（私をTwitterでフォローしている方は、私たちのものを苦労して繰り返し改善していることをご存知かもしれません！）</small>

Next.jsは次のように説明されています：

> プロダクション用のReactフレームワーク。Next.jsは、ハイブリッドな静的およびサーバーレンダリング、TypeScriptサポート、スマートなバンドリング、ルートの事前取得など、プロダクションに必要なすべての機能を備えた、最高の開発者体験を提供します。設定は不要です。

Next.jsはVercelによって開発されています。VercelプラットフォームのGitHubリポジトリを見ると、次のように述べられています：

> Vercelは、ヘッドレスコンテンツ、コマース、またはデータベースと統合するために構築された、静的サイトとフロントエンドフレームワークのためのプラットフォームです。

Remixは次のように説明されています：

> Remixは、モダンで高速かつ堅牢なユーザーエクスペリエンスを構築するためのエッジネイティブなフルスタックJavaScriptフレームワークです。Web標準によってクライアントとサーバーを統一し、コードについて考える必要を減らし、製品について考えることができます。

それぞれの説明を対比してみてください。

## ホームページ、ビジュアルコンプリート

> RemixはNext.jsと同じくらい速いですか？

これは通常、人々が最初に尋ねる質問です。Next.jsはしばしば「デフォルトでパフォーマンス」というフレーズを使用しており、それを十分に備えています！各アプリが「ビジュアルコンプリート」ページをどれだけ速くレンダリングできるかを見てみましょう。

私たちはこれらのサイトを[WebPageTest][wpt]で実行しました。これは、この記事の比較GIFを生成する素晴らしいツールです。すべての比較では、各フレームワークを5回実行し、そのうちの最良の結果を取得しました。

各比較の上には、アニメーションを生成した結果へのリンクがあるキャプションがあります。WebPageTest.comで「テストを再実行」をクリックすることで、自分自身ですべてを検証することができます。

最初のものは、バージニアからインターネットへのケーブルモデム接続で実行されました。

[<figcaption>ホームページ、バージニア、ケーブル</figcaption>][wpt-virginia-cable]

![Remixは0.7秒で読み込まれ、Nextは0.8秒で読み込まれます][wpt-virginia-cable-gif]

何も言わずに、まずは3つのバージョンが非常に高速であることを認識しましょう。誰がより速いかを比較する価値さえありません。Next.jsにとっても少し不公平です。なぜなら、クッキーバナーの小さなアニメーションは「視覚的に完了」として考慮され、Remixサイトにはありません。スローモーションで見てみましょう：

[<figcaption>ホームページ、バージニア、ケーブル、スローモーション</figcaption>][wpt-virginia-cable]

![Remixは0.7秒で読み込まれ、Nextは0.8秒で読み込まれます][wpt-virginia-cable-gif-slow-mo]

これで、Next.jsが実際に0.8秒で完了していることがわかります。再度言いますが、どれも速いです。また、3Gネットワーク接続で同じテストを実行しましたが、結果は同じでした：すべてが速く、見た目もほぼ同じでした。

✅ RemixはNext.jsと同じくらい速いです

## アプリが高速な理由

**Next.jsが高速な理由**：ホームページでは、`getStaticProps`を使用した[静的サイト生成][getstaticprops]（SSG）を使用しています。ビルド時に、Next.jsはShopifyからデータを取得し、ページをHTMLファイルにレンダリングしてパブリックディレクトリに配置します。サイトがデプロイされると、静的ファイルはエッジ（VercelのCDN外）で提供されるようになります。リクエストが届くと、CDNは単純にファイルを提供します。データの読み込みとレンダリングはすでに事前に行われているため、訪問者はダウンロードとレンダリングのコストを支払う必要はありません。また、CDNはグローバルに配信され、ユーザーに近い場所に配置されています（これが「エッジ」です）。そのため、静的に生成されたドキュメントのリクエストは単一のオリジンサーバーまで移動する必要がありません。

**Remixポートが高速な理由**：RemixはSSGをサポートしていないため、HTTPの[stale-while-revalidateキャッシュ指示][swr]（Vercelの`swr`クライアントフェッチパッケージとは異なる）を使用しました。最終的な結果は同じです：エッジにある静的ドキュメント（Vercelの同じCDN上にある場合もあります）。違いは、ドキュメントがそこに到達する方法です。

ビルド/デプロイ時にすべてのデータを取得してページを静的なドキュメントとしてレンダリングする代わりに、キャッシュはトラフィックを受けるときにプライムされます。ドキュメントはキャッシュから提供され、次の訪問者のためにバックグラウンドで再検証されます。SSGと同様に、トラフィックを受けるときに訪問者はダウンロードとレンダリングのコストを支払う必要はありません。キャッシュミスについては、後ほど少し詳しく説明します。

SWRはSSGの素晴らしい代替手段です。Vercelへのデプロイが素晴らしいのも、彼らのCDNがそれをサポートしていることです。

RemixのポートがNext.jsほど速くない理由について疑問に思うかもしれません。Remixにはまだ組み込みの画像最適化がないため、画像はNext.jsアプリに向けてポイントされています🤫。ブラウザは両方のドメインに接続を開く必要があり、これにより画像の読み込みが0.3秒遅れます（[ネットワークのウォーターフォール][delayed-images]で確認できます）。画像が自己ホストされていれば、他の2つと同じくらいの0.7秒で表示されるでしょう。

**Remixの高速化方法**: SSGやSWRでドキュメントをエッジでキャッシュする代わりに、このバージョンでは[Redis][redis]でデータをエッジでキャッシュします。実際には、[Fly.io][fly]を使用してアプリケーションをエッジで実行します。最後に、[Resource Route][resource-route]を使用してクイックな画像最適化を行い、[永続ボリューム][volume]に書き込みます。基本的には独自のCDNです 😎。

数年前にはこれを構築するのは難しかったかもしれませんが、サーバーランドスケープは過去数年間で大きく変化し、ますます良くなっています。

## 動的ページの読み込み

> RemixはNext.jsとはどう違うのですか？

これは私たちがよく聞かれる次の質問です。機能セットには多くの違いがありますが、主なアーキテクチャの違いは、Remixが速度にSSGに依存しないことです。

ほとんどのアプリでは、SSGではサポートできないケースに必ず遭遇します。ここで比較しているアプリケーションでは、それは検索ページです。

制約として、ユーザーは無限のクエリを送信することができます。宇宙の現在の制約により、無限のページを静的に生成することはできません。SSGは適用されません。

[<figcaption>検索ページ、キャッシュ済み、バージニア、ケーブル</figcaption>][wpt-virginia-search-cable]

![Remix in 0.8s, Next.js 1.9][wpt-virginia-search-cable-gif]

SSGは動的なページにはスケーリングしないため、Next.jsはユーザーのブラウザからのクライアントサイドデータ取得に切り替えました。ネットワークのウォーターフォールを見ると、なぜRemixよりも2.3倍遅いのかがわかります。

<div class="flex w-full gap-4">
  <div class="w-1/2">
    <figcaption class="text-center bold text-base">Remixの検索</figcaption>
    <a data-noprefetch href="/blog-images/posts/remix-vs-next/wpt-search-remix-waterfall.png"><img src="/blog-images/posts/remix-vs-next/wpt-search-remix-waterfall.png" /></a>
  </div>
  <div class="w-1/2">
    <figcaption class="text-center text-base">Next.jsの検索</figcaption>
    <a data-noprefetch href="/blog-images/posts/remix-vs-next/wpt-search-next-waterfall.png"><img src="/blog-images/posts/remix-vs-next/wpt-search-next-waterfall.png" /></a>
  </div>
</div>

Remixアプリは、Next.jsアプリが画像の読み込みを開始する前に完全に完了しています。ウェブパフォーマンスで重要なことは、ネットワークのウォーターフォールを並列化することです。Remixでは、これについて熱心です。

**Next.jsが遅い理由**: Next.jsは、私たちが「ネットワークウォーターフォールリクエストチェーン」と呼んでいるものを導入しました。SSGはここでは使用できないため、アプリは検索結果をユーザーのブラウザから取得しています。データを取得するまで画像を読み込むことができず、JavaScriptを読み込み、解析し、評価するまでデータを取得することができません。

クライアントでの取得は、ネットワークを介してより多くのJavaScriptとパース/評価にかかる時間を意味します。パース/評価については忘れがちですが、15番目のリクエストでのJSの実行時間がドキュメントのダウンロード時間よりも長くなっていることがわかります！ Next.jsは、Remixよりも1.5倍多いJavaScriptを送信しており、アンパック時には566 kB対371 kBです。ネットワーク上では、圧縮された状態で50 kB多くなっています（172 kB対120 kB）。

ブラウザでの作業量が増えると、問題が蓄積されていきます。CPUの利用率とブラウザのメインスレッドのアクティビティを示す下部の行を見てください。Next.jsアプリは、大きな赤い「長いタスク」によって遅くなっています。

**Remixがホームページと同じく高速な理由**: 実際のRemixの例では、リクエスト時にShopify APIと通信する必要はありませんでした。SSGは検索ページをキャッシュすることはできませんが、RemixのバージョンではSWRまたはRedisを使用してキャッシュすることができます。ページを生成するための単一の動的な方法がある場合、アプリケーションコードを変更せずにキャッシュ戦略を調整することができます。その結果、よく訪れるページでもSSGの速度が実現されます。`"/search"`ページや左側のナビゲーションのカテゴリ、"tshirt"のような一般的なクエリは、おそらくプライムされているでしょう。

## 動的ページのキャッシュミス

> でも、キャッシュミスはどうなるの？

これについては、おそらく私の言葉だけでは信じてもらえないかもしれませんし、私自身もキャッシュが空だったことを証明する方法はありませんが、ここにRemixのキャッシュミスがあります<small>（心の底から、死ぬことを誓って、目に針を刺す）</small>。

[<figcaption>検索ページ、キャッシュなし、バージニア、ケーブル</figcaption>][wpt-virginia-search-miss]

![Remixは3.9秒で読み込まれ、Nextは8秒かかります][wpt-virginia-search-miss-gif]

実は、私は嘘をつきました。これはRemix Rewriteのキャッシュヒットです。[キャッシュミスの方が速かった][wpt-virginia-search-miss-fast]です（0.6秒 🤭）。本当に信じてもらえないと思ったので、遅いキャッシュヒットをグラフィックに入れました 😅

> ありえない！

実は、Shopify APIは非常に高速です。

Next.jsアプリはブラウザから直接Shopify APIに取得を行っているため、テストの[ネットワークグラフ][shopify-api-is-fast]を見ると、リクエストにかかった時間はわずか224msであることがわかります。リクエストを行うよりもブラウザがAPIとの接続を確立するのに時間がかかりました！（初期のHTMLに`<link rel="preconnect" />`を追加することで、これを高速化することができます。）

ユーザーのブラウザがそんなに速くShopifyにリクエストを送信できるのであれば、Remixサーバーも確実により速く処理できます。ユーザーのクラウドへの接続は常にサーバーの接続よりも遅くなるため、データの取得はサーバー側に行うのが最適です。

結論として、Shopify APIを使用する場合、キャッシュはほとんど意味をなしません。キャッシュのヒットまたはミスは、ほとんど区別できません。

これは、ユーザーのネットワークを遅くして何が起こるかを確認することで最もよく示されます。では、今度は香港の3G接続から別のキャッシュミスを行ってみましょう。

[<figcaption>検索ページ、キャッシュなし、香港、3G</figcaption>][wpt-hkg-search-3g]

![Remixは3.1秒で読み込まれ、Nextは6.6秒で読み込まれます][wpt-hkg-search-3g-gif]

Next.jsはキャッシュミスでも3.5秒遅れています。何が問題なのでしょうか？

> Shopify APIは速いと言ったのに！

Next.jsはデータを読み込むまで画像を読み込むことができず、JavaScriptを読み込むまでデータを読み込むことができず、ドキュメントを読み込むまでJavaScriptを読み込むことができません。ユーザーのネットワークは、その連鎖のすべてのステップにおいて乗数となります 😫。

Remixでは、ドキュメントが画像を読み込むことができるようになるまで待つだけの連鎖です。サーバー上で常にフェッチするRemixの設計により、ユーザーのネットワークは他のすべての場所での乗数としては存在しません。

Remixでは、リクエストを受け取った時点でShopifyからのフェッチをすぐに開始することができます。ブラウザがドキュメントをダウンロードしてからJavaScriptをダウンロードするまで待つ必要はありません。ユーザーのネットワークがどれだけ遅くても、サーバー上のShopify APIへのフェッチは変わらず、おそらく200ms未満です。

## アーキテクチャの分岐

Next.jsがクライアントでフェッチするように移行したことにより、ユーザーエクスペリエンスだけでなく、Shopifyとの通信に関する2つの異なる抽象化セットが生まれました：SSG用のセットとブラウザ用のセットです。

このようなアーキテクチャの分岐はいくつかの重要な問題を引き起こします：

- ブラウザで認証する必要がありますか？
- APIはCORSをサポートしていますか？
- APIのSDKはブラウザで動作しますか？
- ビルドコードとブラウザコードの間でコードを共有する方法はありますか？
- APIトークンをブラウザで公開しても大丈夫ですか？
- 今送信したトークンにはどのような権限がありますか？
- この関数は`process.env`を使用できますか？
- この関数は`window.location.origin`を読み取ることができますか？
- 両方の場所で動作するネットワークリクエストをどのように作成しますか？
- これらのレスポンスをどこかにキャッシュすることはできますか？
- 両方の場所で動作するイソモーフィックなキャッシュオブジェクトを作成し、異なるデータフェッチ関数に渡すべきですか？

<small>(おおまかに言ってイソモーフィックと言いました) <small>(これはこの投稿とは関係ありません) <small>(がー、プロファンクターオプティクス！)</small></small></small>

Remix.runについてのこれらの質問に答えましょう。サーバー上でShopify APIを抽象化する必要があります。

- ブラウザで認証する必要がありますか？（いいえ）
- APIはCORSをサポートしていますか？（問題ありません）
- API SDKはブラウザで動作しますか？（必要ありません）
- ビルドとブラウザのコードの間でコードを共有する方法はありますか？（必要ありません）
- APIトークンをブラウザで公開しても問題ありますか？（必要ありません）
- すべての訪問者に配布したトークンにはどのような権限がありますか？（していません！）
- この関数は`process.env`を使用できますか？（はい）
- この関数は`window.location.origin`を読み取ることができますか？（いいえ）
- 両方の場所で動作するネットワークリクエストをどのように作成しますか？（ブラウザではないので、どのようにでも作成できます）
- これらのレスポンスをどこかにキャッシュすることはできますか？（HTTP、redis、lru-cache、永続ボリューム、sqliteなど、どこでもキャッシュできます）
- 両方の場所で動作するイソモーフィックなキャッシュオブジェクトを作成し、異なるデータフェッチ関数に渡す必要がありますか？（必要ありません！）

これらの質問に対する回答が簡単であればあるほど、抽象化がより優れており、取り扱いやすいコードになります。

もしNext.jsアプリがクライアントフェッチから離れて`getServerSideProps`を使用するようになれば、このギャップを埋めることができ、これらの質問に対するより簡単な回答が得られるでしょう。興味深いことに、Next.jsのドキュメントはしばしばサーバーフェッチから離れてSSGやクライアントフェッチに誘導しています。

> データを事前レンダリングする必要がない場合は、クライアントサイドでデータを取得することを検討するべきです。

また、ユーザーデータを持つページではクライアントフェッチを推奨しており、再びアーキテクチャの分岐を促しています。

> たとえば、ダッシュボードはプライベートでユーザー固有のページであるため、SEOは関係ありません。

ここで見たように、サーバーレンダリングはSEOだけでなく、パフォーマンスの向上にも関係しています。

基本的な違いは、Next.jsにはページ上でデータを取得するための4つの「モード」があることです。

- `getInitialProps` - サーバーとクライアントの両方で呼び出されます
- `getServerSideProps` - サーバーサイドで呼び出されます
- `getStaticProps` - ビルド時に呼び出されます
- クライアントフェッチ - ブラウザで呼び出されます

Remixには`loader`しかありません。一つの場所で実行されるものを抽象化する方が、三つの場所で実行される四つのものを抽象化するよりも簡単です。

### アーキテクチャの分岐のコスト

このアーキテクチャの分岐のコストを定量化してみましょう。このアプリの中で最も難しい開発タスクは、コマースバックエンドの抽象化です。このアプリは、Shopify、BigCommerce、Spree、Saleorなど、何でも接続できるように設計されています。

Next.jsアプリでは、Shopifyの統合は[このフォルダ][next-shopify]にあります。今日の`cloc`の実行結果は次のとおりです。

```
     101 text files.
      93 unique files.
       8 files ignored.

github.com/AlDanial/cloc v 1.92
---------------------------------------------------------------------
Language           files          blank        comment           code
---------------------------------------------------------------------
TypeScript            88            616           2256           5328
GraphQL                1           1610           5834           2258
Markdown               1             40              0             95
JSON                   2              0              0             39
JavaScript             1              1              0              7
---------------------------------------------------------------------
SUM:                  93           2267           8090           7727
---------------------------------------------------------------------
```

ほぼ100のファイルにまたがる約8,000行のコードです。他の統合に対しても同じような結果が得られます。すべての統合は100のファイルに近づき、約10,000行のコードになります。ほとんどのコードはブラウザにも届きます。

ここには[RemixとShopifyの統合][remix-shopify]があります。

- 1つのファイル
- 608行のコード
- どれもブラウザには送られません

これがアーキテクチャの分岐のコストです。Next.jsの抽象化は、ビルドとブラウザの両方を予測し、参加する必要があります。Remixの抽象化はサーバーのみです。

もしかしたら、2つのShopifyプロバイダーが同じ機能セットを持っているのか疑問に思うかもしれません。そして、私たちは欺いているのかもしれません。多くのプロバイダーには認証やウィッシュリストのためのコードがありますが、Shopifyプロバイダーはどちらも使用していませんでした（ただし、それらのためのモジュールをエクスポートする必要がありました）。2つのウェブサイトを使用してみると、同じ機能セットを持っているように見えます。どちらにしても、もし何かを見落としたとしても、アプリの表示されている機能に比べて7,000行のコードが必要になるとは想像しにくいです。

たとえNext.jsが検索ページに`getServerSideProps`を移行したとしても、データ変更機能にはほぼすべてのコードが必要になるでしょう。しかし、今は話が進みすぎています！

## Edge Native

「エッジへのデプロイ」についてよく話しますが、それはどういう意味でしょうか？今回は、高速なユーザーネットワークを持つ香港での別のキャッシュミスの例を紹介します。

[<figcaption>検索ページ、キャッシュなし、香港、ケーブル</figcaption>][wpt-hkg-search-miss-cable]

![Remixは3.9秒で読み込まれ、Nextは8秒かかります][wpt-hkg-search-miss-cable-gif]

今回は、2つのRemixアプリの違いについて話します。すでにわかっているように、Next.jsのバージョンはネットワークのウォーターフォールチェーンのために遅くなっています。

両方のRemixアプリはサーバーでフェッチしていますが、なぜRemix Portの方がRemix Rewriteよりも遅れているのでしょうか？

答えは簡単です。Remix PortはVercelの関数で実行されており、Vercelの関数はあなたのコードをエッジで実行しません。[デフォルトではワシントンDC地域で実行されます](https://vercel.com/docs/concepts/functions/regions#default-region)。それは香港からはかなり遠い場所です！

つまり、ユーザーは香港からワシントンDCまで行かなければならず、サーバーがShopifyからデータをフェッチし始めることができます。サーバーが終わったら、ドキュメントを遠くまで送り返さなければなりません。

一方、Remix RewriteはワシントンDCで実行されていますが、香港でも実行されています！つまり、ユーザーはRemixサーバーへの非常に迅速なホップを持ち、すべてがより速くなります。

それは、町に入るために自転車で電車に乗ることと、一直線に自転車で行くことの違いです。

🚲-----------------------------------------🏢<br/>
🚲-----🚊====🏢

通常通り、ネットワークのウォーターフォールでこれが表れています：

<div class="flex w-full gap-4">
  <div class="w-1/2">
    <figcaption class="text-center bold text-base">Remix Rewrite @ エッジ</figcaption>
    <a data-noprefetch href="/blog-images/posts/remix-vs-next/wpt-hkg-search-rewrite-waterfall.png"><img src="/blog-images/posts/remix-vs-next/wpt-hkg-search-rewrite-waterfall.png" /></a>
  </div>
  <div class="w-1/2">
    <figcaption class="text-center text-base">Remix Port @ US East</figcaption>
    <a data-noprefetch href="/blog-images/posts/remix-vs-next/wpt-hkg-search-port-waterfall.png"><img src="/blog-images/posts/remix-vs-next/wpt-hkg-search-port-waterfall.png" /></a>
  </div>
</div>

インフラストラクチャの違いは、ドキュメントの最初の青いバーで現れます。Remix Portでは、はるかに大きくなります。それはユーザーがVercelの関数バイクレーンを使って世界の半分を自転車で走ることを意味します。Remix Rewriteでは、電車に乗ってShopify APIに行き、より早く戻ってきました。

このバージョンは、世界中の数十の地域でNode.jsサーバーを実行できる[Fly.io][fly]上で実行されます。ただし、RemixはNode.jsに依存していません。任意のJavaScript環境で実行できます。実際、すでに[Cloudflare Workers][cf-workers]で実行されています。これは、世界中に分散された[250のサーバー][cloudflare-network]でコードが実行されていることを意味します。ユーザーに近い場所で実行されることはありません！

これが、Remixが「エッジネイティブ」であると言っている理由です。Next.jsはNode.jsに依存しているため、現在はエッジへの展開能力が制限されています。

この領域では、開発者エクスペリエンスを向上させるためにまだ多くの作業が必要です。現時点では、公式にはNode.jsとCloudflareのみをサポートしていますが、Denoにも積極的に取り組んでおり、コミュニティメンバーはFastly上でRemixを実行しています。

Remixのような「エッジネイティブ」フレームワークを使用すると、どのユーザーにも高速なエクスペリエンスを提供できます。世界中のどこにいても、高速なエクスペリエンスをすべてのユーザーに提供できるのです。

エッジはRemixが作られたものです。見ての通り、非常に有望です。Vercelチームもアプリをエッジに展開するために一生懸命取り組んでいるとのことです。Remixはそれに対応しており、試してみるのが待ちきれません。

## クライアントサイドのトランジション

両方のフレームワークは、リンクのプリフェッチングによる瞬時のトランジションを可能にしますが、Next.jsはSSGから作成されたページに対してのみこれを行います。検索ページはまたもや除外されました。<small>（次回に期待しましょう）</small>

しかし、**Remixはデータの読み込みのためのアーキテクチャの分岐がなかったため、任意のページをプリフェッチすることができます。**予測できないユーザーが操作する検索ページのURLをプリフェッチすることは、予測可能な商品のURLをプリフェッチすることと変わりません。

実際、Remixのプリフェッチはリンクに限定されることはありません。いつでも、どんな理由でも、任意のページをプリフェッチすることができます！これを見てください、ユーザーが入力するにつれて検索ページをプリフェッチしています：

<figcaption>検索入力のプリフェッチ、高速な3G</figcaption>

<video autoplay loop controls width="100%">
  <source src="/blog-images/posts/remix-vs-next/prefetch-search.mp4" type="video/mp4" />
</video>

スピナーやスケルトンを使わず、遅いネットワークでも即座にユーザーエクスペリエンスを提供します🏎

これは非常に簡単に行えました。

```tsx
import { Form, PrefetchPageLinks } from "@remix-run/react";

function Search() {
  let [query, setQuery] = useState("");
  return (
    <Form>
      <input type="text" name="q" onChange={(e) => setQuery(e.target.value)} />
      {query && <PrefetchPageLinks page={`/search?q=${query}`} />}
    </Form>
  );
}
```

RemixはHTMLの`<link rel="prefetch">`を使用しています（Next.jsのようなメモリキャッシュではなく）。そのため、ブラウザが実際にリクエストを行います。ビデオを見ると、ユーザーが現在のフェッチを中断するとリクエストがキャンセルされる様子がわかります。Remixは非同期処理の優れたハンドリングのために1文字のコードも出荷する必要はありませんでした。 #useThePlatform ... あるいは、うーん、#reuseThePlatform 😎?!

## データの変更

ここで、RemixとNext.jsはまったく異なる見た目になります。アプリのコードの半分はデータの変更に関連しています。ウェブフレームワークもそれを尊重する時が来ました。

**Next.jsでの変更の仕組み**: Next.jsはここでは何もしません。`<button onClick={itsAllUpToYou}>`。通常、フォームの状態を管理して投稿する内容を把握し、投稿するためのAPIルートを追加し、ローディングとエラーの状態を追跡し、データを再検証し、変更をUI全体に伝播させ、最後にエラーや中断、競合状態に対処する必要があります<small>（でも正直言って、誰もそれを_実際に_扱っていない）</small>。

**Remixでの変更の仕組み**: RemixはHTMLフォームを使用します。思っていることがわかります。

> ふんっ...ウェブアプリを作っているんだから、これは絶対に機能しないよ。

このAPIが、モダンなウェブアプリのニーズを処理する能力がないように見えるかもしれません。私のキャリア全体が高度にインタラクティブなウェブアプリに関わってきましたが、Remixはそれを考慮して設計されました。これが昔のPHPのように見えるからといって、現代の洗練されたユーザーエクスペリエンスにスケールアップできないわけではありません。Remixはスケールアップすると言っていますが、スケールダウンもできます。だから、Remixを理解するために昔の日々に戻ってみましょう。

ウェブの黎明期から、変更はフォームとそれを処理するサーバーページとしてモデル化されています。Remixを完全に無視して、次のようになります:

```html
<form method="post" action="/add-to-cart">
  <input type="hidden" name="productId" value="123" />
  <button>Add to Cart</button>
</form>
```

```js
// on the server at `/add-to-cart`
export async function action(request) {
  let formData = await request.formData();
  return addToCart(formData);
}
```

ブラウザは、フォームのシリアライズされたデータを使用して `"/add-to-cart"` に POST し、保留中の UI を追加し、完了したらデータベースからのすべての新しいデータを持つ新しいページをレンダリングします。

Remix は HTML フォームと同じことをしますが、大文字の `<Form>` とルートの `action` という関数（Next.js のページが独自の API ルートだと想像してください）を最適化しています。ドキュメントの再読み込みではなく `fetch` を使用して投稿し、その後、サーバーとの間でページ上のすべてのデータを再検証して、UI をバックエンドと同期させます。これは SPA で行っていることと同じですが、**Remix がすべてを管理してくれる**ということです。

フォームとサーバーサイドのアクション以外に、サーバーとの変更を伝えるために必要なアプリケーションコードはありません。また、変更を他の UI に伝えるためのアプリケーションコンテキストプロバイダーやグローバルステート管理のトリックも必要ありません。これが、Remix のバンドルが Next.js のバンドルよりもほぼ30%小さい理由です。自分の "API ルート" と通信するためにそのすべてのコードは必要ありません。

おっと、また嘘をつきました。このコードは実際には Remix で動作します。小文字の `<form>` を使用すると、Remix ではなくブラウザがポストを処理します。JavaScript の読み込みに失敗する状況では便利です 😅 <small>（後で詳しく説明します）</small>

Remix には、ビジーなスピナーや進行状況、楽観的な UI を作成するために投稿されるデータに関するトランジションについて尋ねることで、洗練された UI にスケールアップすることもできます。モデルは HTML フォームであり、機能はデザイナーが考えつくものです。そして、実装を完全に再設計する必要はありません。

Remix がここで行ってくれることは、小さなバンドルとシンプルなミューテーション API だけではありません。

Remix はサーバーとのすべてのやり取り（データの読み込みとデータの変更）を処理するため、ウェブアプリの長年の問題を解決するというウェブフレームワークの中でユニークな能力を持っています。

## 未処理のエラー

「カートに追加」のバックエンドハンドラがエラーをスローした場合、どうなるでしょうか？ここでは、カートにアイテムを追加するルートへのリクエストをブロックして、何が起こるかを確認します。

<figcaption>Next.jsのPOSTエラー</figcaption>

<video autoplay loop controls width="100%">
  <source src="/blog-images/posts/remix-vs-next/next-error.mp4" type="video/mp4" />
</video>

何も起こりません。エラーハンドリングは難しくて面倒です。多くの開発者はここでスキップしてしまいます。私たちはこれが非常に悪いデフォルトのユーザーエクスペリエンスだと考えています。

それでは、Remixではどうなるか見てみましょう。

<figcaption>RemixのPOSTエラー</figcaption>

<video autoplay loop controls width="100%">
  <source src="/blog-images/posts/remix-vs-next/remix-error.mp4" type="video/mp4" />
</video>

Remixは、アプリ内のデータとレンダリングに関するすべてのエラーを処理します。サーバー上のエラーも含めてです。

あなたがやるべきことは、アプリのルートに[エラーバウンダリ][eb]を定義するだけです。さらに詳細に制御することもでき、エラーが発生したページの一部のみをダウンさせることもできます。

Remixがこれを実現できる唯一の理由は、Remixのデータの抽象化がアプリにデータを取り込む方法だけでなく、それを変更する方法にまで及んでいるからです。

## 中断

ユーザーはよくボタンを2回押してしまい、ほとんどのアプリはそれにうまく対処しません。しかし、ユーザーが非常に速くボタンをクリックすることを予想しており、UIがすぐに反応することを望むボタンもあります。

このアプリでは、ユーザーはカート内のアイテムの数量を変更することができます。おそらく、数回クリックして数を増やすでしょう。

それでは、Next.jsアプリが中断にどのように対処するか見てみましょう。

<figcaption>Next.jsの中断</figcaption>

<video autoplay loop controls width="100%">
  <source src="/blog-images/posts/remix-vs-next/change-quantity-next.mp4" type="video/mp4" />
</video>

実際に何が起こっているかは少し見づらいですが、ビデオコントロールをスクラブするとより良く見えます。中央部分で5から6から5へと変化する奇妙な動きがあります。最後の数秒が最も興味深いです。最後に送信されたリクエストが着地し（4になるため）、数フレーム後に最初に送信されたリクエストが着地します！数量フィールドはユーザーの操作なしに5から4から2にジャンプします。信頼性の低いUIですね。

このコードは競合状態、中断、または再検証を管理していないため、UIはサーバーと同期していない可能性があります（2または4が最後にサーバーサイドのコードに到達したかどうかに依存します）。中断を管理し、変更後にデータを再検証することで、これを防ぐことができました。

競合状態や中断を扱うのは難しいと理解しています！だからほとんどのアプリはそれを行いません。Vercelチームは業界でも最も優れた開発チームの一つであり、彼らさえもそれをスキップしました。

実際、私たちが前回のブログ記事でReactコアチームが作成したReact Server Componentsの例を移植したとき、彼らも同じバグを抱えていました。

先ほど述べたように、私たちはネットワークタブにこだわっています。Remixがこれをどのように処理するか見てみましょう。

<figcaption>Remixの中断処理</figcaption>

<video autoplay loop controls width="100%">
  <source src="/blog-images/posts/remix-vs-next/change-quantity-remix.mp4?f" type="video/mp4" />
</video>

Remixは中断時にリクエストをキャンセルし、POSTが完了した後にデータを再検証します。これにより、フォームで行った変更だけでなく、ページ全体のUIがサーバーと同期していることが保証されます。

おそらく、Next.jsアプリよりも私たちのアプリには細部への注意が必要だと思うかもしれません。しかし、この動作はすべてアプリケーションコードに含まれていません。Remixのデータ変更APIに組み込まれています。<small>（実際には、ブラウザがHTMLフォームで行うことと同じです...）</small>

Remixのクライアントとサーバーのシームレスな統合と移行は前例のないものです。

## Remix ❤️ ウェブ

私たちのウェブ開発の数十年のキャリアで、以前はどれだけシンプルだったかを覚えています。ボタンをフォームに配置し、データベースに書き込むページを指定し、リダイレクトして、更新されたUIを取得するだけでした。とても簡単でした。

RemixのAPIを設計する際には、常にプラットフォームを最初に考えます。たとえば、変更操作のワークフローです。HTMLフォームAPIとサーバーサイドのハンドラーが適切だとわかっていたので、それを基に構築しました。それが目標ではなかったのですが、驚くほど素晴らしい副作用として、Remixアプリのコア機能はJavaScriptなしでも動作します！

<figcaption>JavaScriptを使わずにRemix</figcaption>

<video autoplay loop controls width="100%">
  <source src="/blog-images/posts/remix-vs-next/no-js.mp4" type="video/mp4" />
</video>

Remixをこのように使用することは完全に有効ですが、JavaScriptを使用せずにウェブサイトを構築することは意図していません。私たちは素晴らしいユーザーインターフェースを構築するための大きな野心を持っており、そのためにはJavaScriptが必要です。

「RemixはJavaScriptなしで動作します」と言う代わりに、「Remixは**JavaScriptの前**で動作します」と言いたいと思います。おそらく、ユーザーがページがJavaScriptを読み込んでいる最中に列車のトンネルに入ったかもしれません。彼らが戻ってきたとき、ページは通常動作します。私たちは本当に単純なHTMLを目指していましたが、非常に堅牢なフレームワークになりました。

サーバーサイドのコードを書くために、私たちはウェブプラットフォームを参照しています。別の新しいJavaScriptのリクエスト/レスポンスAPIを作る代わりに、Remixは[Web Fetch API][fetch]を使用します。URLの検索パラメータを扱うためには、組み込みの`URLSearchParams`を使用します。フォームデータを扱うためには、組み込みの`FormData`を使用します。

```js
export function loader({ request }) {
  // request is a standard web fetch request
  let url = new URL(request.url);

  // remix doesn't do non-standard search param parsing,
  // you use the built in URLSearchParams object
  let query = url.searchParams.get("q");
}

export function action({ request }) {
  // formData is part of the web fetch api
  let formData = await request.formData();
}
```

Remixを学び始めると、Remixドキュメント以上に、[MDN][mdn]のドキュメントに多くの時間を費やすことになるでしょう。Remixがあなたがそれを使用していない場合でも、より良いウェブサイトの構築を支援することを望んでいます。

Remixを上達させることで、ウェブのスキルも自然と向上します。

これは私たちにとっての核心価値です。Remixアプリは非常に高速ですが、私たちは実際にはパフォーマンスに過度に焦点を当てていません。代わりに、問題の解決策を見つけるためにプラットフォームを参照し、それらをより使いやすくすることで、パフォーマンスは自然と改善されます。

## 変化に最適化する

両方のフレームワークがどのように動作するかを知ったので、アプリが変化にどのように応答するかを見てみましょう。私は常に「変化に最適化する」というフレーズが好きで、RemixのAPIを設計する際にはよく話題にしています。

### ホームページの変更

ホームページの商品を変更したいと考えてみましょう。それはどのようになりますか？Next.jsには2つの選択肢があります。

- アプリを再ビルドして再デプロイします。ビルド時間はストア内の商品数と線形に増加します（各ビルドはすべての商品のデータをShopifyから取得する必要があります）。フッターのタイポを修正するだけでも、その変更をデプロイするためにShopifyからすべての商品をダウンロードする必要があります。ストアが数千の商品に成長すると、これは問題になります。

- [Incremental Static Regeneration][isr]を使用します。VercelはSSGのビルド時間の問題に気付き、ISRを作成しました。ページがリクエストされると、サーバーはキャッシュされたバージョンを送信し、その後バックグラウンドで新しいデータで再構築します。次の訪問者は新しくキャッシュされたバージョンを取得します。

  ページがデプロイ時にビルドされていなかった場合、Next.jsはページをサーバーレンダリングし、その後CDNにキャッシュします。これはまさにHTTPのstale-while-revalidateと同じですが、ISRは非標準のAPIとベンダーロックインが付属しています。

Remixでは、単にShopifyで製品を更新するだけで、キャッシュのTTL内で製品が更新されます。また、午後にウェブフックを設定してホームページのクエリを無効化することもできます。

このインフラストラクチャはSSGを選択するよりも手間がかかりますが、この記事で見たように、任意のサイズの製品カタログ、任意の種類のUI（検索ページ）にスケーリングし、より多くのユーザーでSSGよりも高速になります（一般的な検索クエリをキャッシュできます）。また、特定のホストに結びつけられず、Remixはアプリケーションロジックにほとんど標準のWeb APIを使用しているため、フレームワークにほとんど結びつけられません。

さらに、データをサーバー上でのみ一方向に読み込むことは、よりクリーンな抽象化につながると考えています。

### キャッシュミスについてはどうですか？

これは素晴らしい質問です。サーバーとHTTPのキャッシュは、サイトにトラフィックがある場合にのみ機能します。実際、ビジネスもサイトにトラフィックがある場合にのみ機能します 😳。1日に2回のページビューで1秒速くなる必要はありません。メーリングリストが必要です。

- Remixの製品ページでのキャッシュヒットは、Next.jsサイトの検索ページ（SSGを使用できない場合）よりも遅くありません。いつオンラインショッピングをしたときに検索せずに商品を購入しましたか？一般的なクエリでキャッシュが満たされると、さらに高速になります。
- 一般的なランディングページはほぼ常にプライムされ、Remixのプリフェッチングにより次の遷移が即座に行われます。Remixは、Next.jsとは異なり、動的またはそれ以外の任意のページをプリフェッチできます。
- SSGの特定のスケールでは、ISRに切り替える必要があります。これにより、前回のデプロイに含まれていなかったページでも同じキャッシュミスの問題が発生します。

キャッシュミスのリクエストが訪問の大部分を占める場合、キャッシュヒット率を100%にすることはビジネスを修正しません。技術的な問題ではなく、マーケティングの問題です。

### パーソナライゼーション

別の変更を考えてみましょう。製品チームがあなたにやってきて、ユーザーが過去に購入した製品と似た製品を表示するようにホームページが変更されると言います。

検索ページと同様に、SSGは不要であり、デフォルトではパフォーマンスも失われます。SSGは実際には限られたユースケースしか持っていません。

ほとんどのウェブサイトにはユーザーがいます。サイトが成長するにつれて、ユーザーに対してますますパーソナライズされた情報を表示するようになります。それぞれの場合、クライアント側でのフェッチが行われます。ある時点で、ページの大部分がクライアント側でフェッチされ、パフォーマンスが低下します。

Remixでは、これはバックエンドでの異なるデータベースクエリです。

ECOMMERCEの食物連鎖の頂点であるAmazon.comを考えてみましょう。そのページ全体がパーソナライズされています。結果は最初からわかっています。ホームページを調整する際に必要なものをドロップする必要のあるものではなく、目指すべきアーキテクチャに投資してください。

## 要点

Remixの単純な `<Form>` + `action` + `loader` のAPIと、サーバー上にできるだけ多くのものを保持するための設計には、その力を見落とすことが簡単です。これらのAPIは、Remixの高速なページロード、高速なトランジション、ミューテーション周りのより良いUX（中断、競合状態、エラー）、そして開発者にとってよりシンプルなコードを実現します。

Remixアプリは、バックエンドのインフラストラクチャとプリフェッチングによって高速化されます。Next.jsはSSGからその速度を得ています。しかし、SSGはユースケースが限られており、特に機能やデータのスケールが進むにつれて、その速度を失います。

SSGとJamstackは、遅いバックエンドサービスの回避策として優れていました。最新世代のプラットフォームとデータベースは高速であり、ますます高速化しています。これらのアプリをバックアップするShopify APIでも、ほぼ世界中のどこからでも200msでクエリのレスポンスを送信できます。私は南極大陸以外のすべての大陸からテストしました！<small>（今月、そこに行くときには、[@chancethedev](https://twitter.com/chancethedev)に試してもらう必要があります。）</small>

この記事で議論されているキャッシュ戦略はすべてスキップしても、サーバー上の各リクエストでShopify APIにアクセスすることは完全に許容されます。1.2秒の読み込み時間が1.4秒になります。0.8秒の場合は1秒になります。ほとんど変わりません。もしバックエンドAPIが遅い場合は、**バックエンドを高速化するために時間を投資**してください。制御できない場合は、自分自身のサーバーをデプロイし、すべてのユーザーのページを高速化するためにキャッシュを行ってください。

バックエンドへの投資はSSGと同じパフォーマンス結果をもたらしますが、あらゆる種類のページにスケーリングします。SSGよりも初期の作業量は多くなりますが、長期的にはユーザーとコードのためにそれに値すると考えています。

データの読み込みは物語の半分に過ぎません。Remixでは、データの抽象化はデータの変更もカプセル化できます。すべてのコードはサーバー上にあり、アプリケーションコードが改善され、ブラウザのバンドルが小さくなります。

Next.jsでは、APIルートとUIの他の部分への更新の伝播のために、ブラウザにデータの変更コードを自分で送る必要があります。この記事で見たように、トップチームでもエラーや中断、競合状態の周りでこれをうまく処理できないことがあります。

> `getServerSideProps`を無視しているのではありませんか？

一部の人々は、`getServerSideProps`でRemixが行っていることをすべて実現できると言っています。この質問は、まだRemixを十分に説明する機会がないために生じています！

前述のように、これは確かに検索ページの読み込みを高速化します。ただし、データの変更にはまだ対応する必要があります。変更（エラーハンドリング、中断、競合状態、リダイレクト、再検証を含む）のために、`getServerSideProps`、APIルート、およびそれらと通信する独自のブラウザコードの組み合わせが必要です。ここで本当に言いたいのは、「自分自身のRemixを構築することができる」ということです。実際、私たちはすでにそれを行っています 😇。

ふぅ！

私たちによく尋ねられる大きな質問に答えたので、今後の投稿ではRemixができることを本当に見せることができます！

---

- [Next.jsのライブ例][next-demo]
- [Next.jsのソースコード](https://github.com/vercel/commerce/tree/a6babd93d50ebc1b9106edcfb5834a8a2437838e)
- [Remixのライブ例][remix-rewrite]
- [Remixのソースコード](https://github.com/jacob-ebey/remix-ecommerce)

[next-demo]: {twitter.com}
[remix-rewrite]: {twitter.com}


[wpt-virginia-cable]: https://www.webpagetest.org/video/compare.php?tests=220113_BiDc2H_cfaa25c420a8552959c39df6a7d24e08,220113_BiDc1H_6121ab1c9a5c969874e64344aecce3ec,220113_BiDc9N_b9e84f012470b1aeb51754fb010133d9
[wpt-virginia-cable-gif]: /blog-images/posts/remix-vs-next/wpt-virginia-homepage-cable.gif
[wpt-virginia-cable-gif-slow-mo]: /blog-images/posts/remix-vs-next/wpt-virginia-homepage-cable-slow.gif
[wpt-virginia-search-cable]: https://www.webpagetest.org/video/compare.php?tests=220114_AiDcG6_3792ae086fc7d2decbddddc1cc521705,220114_BiDcWS_3b730524b3294cc4aabd961753821fe2,220114_AiDcD6_7aa4143672ff6295a8b88392f3e5ef42
[wpt-virginia-search-cable-gif]: /blog-images/posts/remix-vs-next/wpt-virginia-search-cable.gif
[wpt-virginia-search-miss]: https://www.webpagetest.org/video/compare.php?tests=220114_AiDcMN_e671a25cc0dc7b5bb0986e397e00f044,220114_AiDc8W_e897cd8815342449977013c2d57a4daf,220114_AiDcQX_d4ce4649434538f369982fa828abae82
[wpt-virginia-search-miss-gif]: /blog-images/posts/remix-vs-next/wpt-virginia-search-miss-cable.gif
[wpt-virginia-search-miss-fast]: https://www.webpagetest.org/video/compare.php?tests=220114_BiDc1T_9ea8b52894cbd02675159ae963750ace-r:1-c:0
[wpt-hkg-search-3g]: https://www.webpagetest.org/video/compare.php?tests=220114_BiDcDX_a0db98ec1d32d3be3e263fab2628df47,220114_AiDcJF_f139b368029039e7de112963e2fb43b8
[shopify-api-is-fast]: https://www.webpagetest.org/result/220114_AiDcQX_d4ce4649434538f369982fa828abae82/1/details/#waterfall_view_step1
[wpt-hkg-search-3g-gif]: /blog-images/posts/remix-vs-next/wpt-hkg-search-3G.gif
[wpt-hkg-search-miss-cable]: https://www.webpagetest.org/video/compare.php?tests=220114_AiDc2R_5dfaa245cd27404654074fba9cd73248,220114_AiDcM4_9b913562cae343803f0c4efef48b51b8,220114_AiDcYP_534551c67b82cd664aae1c0813c384de
[wpt-hkg-search-miss-cable-gif]: /blog-images/posts/remix-vs-next/wpt-hkg-search-miss-cable.gif
[hkgsearchcomp]: https://www.webpagetest.org/video/compare.php?tests=220110_AiDcMC_9b1603305e652189ea080a7b8ae75973,220110_AiDc72_5d6c4bc51f42348f04eee578560bf1cd
[hkgsearchcompgif]: /blog-images/posts/remix-vs-next/hkg-search-comp.gif
[nextnojs]: /blog-images/posts/remix-vs-next/next-no-js.jpg
[next-demo]: https://Shopify.demo.vercel.store/
[remix-port]: https://remix-commerce-mcansh.vercel.app/
[remix-rewrite]: https://remix-ecommerce.fly.dev
[remix-port-comp]: https://www.webpagetest.org/video/compare.php?tests=220107_BiDcXG_957c13e3a7f5032087c05863a51897bd,220107_BiDcR8_009afbe99ea1cf88d225d7d477be5e89
[remix-rewrite-comp]: https://www.webpagetest.org/video/compare.php?tests=220107_AiDcK1_cea51d961abd2fb47b99323b57639e65,220107_BiDcEZ_bccde0e5f3f4e88d01ec5e6a9e5e8af0
[next-examples]: https://nextjs.org/examples
[wpt]: https://webpagetest.org
[getstaticprops]: https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
[swr]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate
[isr]: https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
[next-img]: https://nextjs.org/docs/basic-features/image-optimization
[remix-empty-cache]: https://webpagetest.org/result/220108_AiDcA0_c4f31854ad52fa5ac54c7f725871de01/1/details/#waterfall_view_step1
[sie]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error
[prefetch]: https://caniuse.com/link-rel-prefetch
[sydney-cache-miss-comp]: https://www.webpagetest.org/video/compare.php?tests=220110_BiDcTH_bfa0341e83efd414f71ac8ed2f1d311f,220110_AiDcC5_7efb60a6c8e1eb4928922b5bac788436#
[sydney-cache-miss-gif]: /blog-images/posts/remix-vs-next/sydney-cache-miss-cable.gif
[vercel-miss]: https://www.webpagetest.org/result/220110_BiDcT5_204e5de35a6e50af0e62b4972b34c987/1/details/#waterfall_view_step1
[redis]: https://redis.com/
[code-next-add-to-cart]: https://github.com/vercel/commerce/blob/3670ff58690be3af9e2fc33f0d4ba04c992d2cb9/components/product/ProductSidebar/ProductSidebar.tsx#L64
[code-next-api-call]: https://github.com/vercel/commerce/blob/3670ff58690be3af9e2fc33f0d4ba04c992d2cb9/components/product/ProductSidebar/ProductSidebar.tsx#L29-L41
[eb]: https://remix.run/docs/en/v1/guides/errors
[next-shopify]: https://github.com/vercel/commerce/tree/f3cdbe682b6153b6881d8a6597b44429424de269/framework/shopify
[remix-shopify]: https://github.com/jacob-ebey/remix-ecommerce/blob/0abc6a5ad8117961d49dce22764ad06a4508733c/app/models/ecommerce-providers/shopify.server.ts
[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[delayed-images]: https://www.webpagetest.org/result/220113_BiDc1H_6121ab1c9a5c969874e64344aecce3ec/1/details/#waterfall_view
[resource-route]: https://remix.run/docs/en/v1/guides/resource-routes
[volume]: https://fly.io/docs/reference/volumes/
[fly]: https://fly.io/docs/reference/regions/
[cloudflare-network]: https://www.cloudflare.com/network/
[cf-workers]: https://workers.cloudflare.com/
[mdn]: https://developer.mozilla.org/en-US/docs/Web
