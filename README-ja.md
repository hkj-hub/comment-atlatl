# Comment Atlatl

つい、コメントしたくなる。
そんな仕組みを作りたいプロジェクト。

## 環境構築

### はじめに

```
npm install
```

パッケージのインストールを行うと、`package.json`の`prepare`スクリプトによって、
`.githooks`が git の hooks 用リポジトリになる。
ここには下記の hooks を配置する。

| hooks      | 説明                                                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| commit-msg | ルールに基づくブランチ名から`#{Githubのissue番号}`を取得しコミットメッセージの末尾に付与する。ブランチ名ルールは `id/{Githubのissue番号}/hoge` |

コミットメッセージにより、作業ブランチでのコミットと Issue との紐づけを行う。

### ローカル環境でのプレビュー

```
npm run dev
```

http://localhost:3000/ で開発サーバがローカルに立ち上がる。

### ディレクトリ・ファイルについて

#### ディレクトリ

```
.githooks ... Git Hooks用
.github   ... GithubPages公開用のアクションを格納
.vscode   ... vscodeの設定
bin       ... 実行ファイル用
docs      ... GithubPages用のドキュメント
src       ... Next.js のソース
```

#### lint 設定ファイル

linter には eslint、コード整形には prettier を使用する。
vscode の拡張を利用し、保存時に autofix される設定とする。

```
.vscode/extensions.json ... lint拡張プラグインのおすすめ
.vscode/settings.json   ... 保存時に自動でlint fixを行うための設定込
.editorconfig           ... 改行コードをlinux準拠のLFに。インデントを2に。
.eslintrc.cjs           ... eslintの設定
.prettierignore         ... prettier用の設定
.prettierrc             ... prettier用の設定。セミコロン必須。末尾カンマ必須。
```

#### デプロイ設定ファイル

```
.github/workflows/github-pages.yml ... github pages デプロイ用の設定ファイル。
bin/ignore-build-step.sh           ... vercelデプロイをmain,developブランチのpush時のみに限定する。何も設定しない場合は全てのブランチでプレビューデプロイを行ってしまうため設定。
.vercel                            ... vercelデプロイ用の設定ファイル。
```

#### ビルド設定

```
.env             ... 環境変数(git管理)。
.env.local       ... 環境変数(git管理外)。ローカル実行時、.envより.env.localのほうが優先
jsconfig.json    ... @/のエイリアス設定
tsconfig.json    ... ビルドターゲットはesnext。 @/のエイリアス設定
next.config.json ... webpack設定もここで行う
```

#### テスト設定

```
.vscode/extendsions.json ... vscode用ランナー拡張のおすすめ設定
jest.config.mjs          ... @/エイリアス等の設定
tests/*                  ... テストファイル用
```

## デプロイ

### vercel

ブランチを push したときにデプロイのパイプラインが実行される。

| ブランチ | 環境       | URL                                                  |
| -------- | ---------- | ---------------------------------------------------- |
| develop  | プレビュー | https://comment-atlatl-pqffaaoay-hkj-hub.vercel.app/ |
| main     | プロダクト | https://comment-atlatl.vercel.app/                   |

### Github Pages

develop ブランチに push したときに Github actions のパイプラインが実行される。
ただし、docs フォルダ以下が更新されていないときは実行されない。

### URL の発行

```
npm run generate-url
```

SkyWay のトークンを発行し、URL に付与する。
プロダクト環境の URL がハードコーディングされているのでプレビューで試すときは要書き換え。
.env.local ファイルを配置し、SkyWay コンソールから取得した自身の SkyWay のシークレットキー・アプリケーション ID を記載していることを前提とする。

[SkyWay について](https://skyway.ntt.com/ja/docs/user-guide/introduction/)
[SkyWay の認証・認可](https://skyway.ntt.com/ja/docs/user-guide/authentication/)

## ドキュメント

astro を使ってマークダウンで記述する。

```
docs/astro/src/config.ts ... SIDEBAR変数にページのルーティングを設定
docs/astro/src/pages/ja/ ... マークダウンでドキュメントを記述
public/images/           ... ドキュメントに画像を使いたいときはここに配置。マークダウンで画像のURLを指定するときはprefixで/comment-atlatl/が必要。（例： /comment-atlatl/images/hoge.png ）
```

## 設定

### WebAssembly の利用設定

next.config.js

RAPIER.js が WebAssembly を使用するため、対応のための設定を入れている。
下記設定を外すと、ビルドエラーとなる。

```js
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,
    };
    config.output.webassemblyModuleFilename =
      (isServer ? '../' : '') + 'static/wasm/webassembly.wasm';
    return config;
  },
};
```

### SkyWay の利用

npm install を行うと、Next.js の SSR 時にエラーとなるため、cdn を利用してクライアントでのみ動作するようにしている。
