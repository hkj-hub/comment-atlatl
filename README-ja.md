# Comment Atlatl

つい、コメントしたくなる。
そんな仕組みを作りたいプロジェクト。

## 使い方

1.  [skyway](https://console.skyway.ntt.com/login)コンソールにログインする。
1.  アプリケーションを作成し、 シークレットキーとアプリケーション ID を取得する
1.  clone した本リポジトリに、`.env.local` ファイルを作成し、取得したシークレットキーとアプリケーション ID を記載する
    ```
    SECRET_TOKEN=your skyway secret key
    APPLICATION_TOKEN=your sky way application id
    APPLICATION_URL=http://localhost:3000
    ```
1.  SkyWay トークンを付与したローカルサーバの URL を発行する
    ```
    npm install
    npm run generate-url
    ```
1.  ローカルサーバを起動する
    ```
    npm install
    npm run dev
    ```
1.  先ほど発行したローカルサーバの URL にアクセスする

## 開発環境構築

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

[FSD-with-nextjs](https://feature-sliced.design/docs/guides/tech/with-nextjs)の構成とする

```
.githooks ... Git Hooks用
.github   ... GithubPages公開用のアクションを格納
.vscode   ... vscodeの設定
bin       ... 実行ファイル用
docs      ... GithubPages用のドキュメント
src       ... Next.js のソース / FSD
pages     ... Next.js のソース / routing
types     ... グローバルに利用する型。乱用注意
```

#### lint 設定ファイル

linter には eslint、コード整形には prettier を使用する。
vscode の拡張を利用し、保存時に autofix される設定とする。

```
.vscode/extensions.json ... lint拡張プラグインのおすすめ
.vscode/settings.json   ... 保存時に自動でlint fixを行うための設定込
.editorconfig           ... 改行コードをlinux準拠のLFに。インデントを2に。
.eslint.config.mjs      ... eslintの設定
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
### リリースノートの追加
#### 自動生成リリースノート

- `.github/release.yml`           ... リリースノート自動設定用の情報を記載
- `.github/workflows/label.yml`   ... プルリク作成時のラベル付与
- `.github/workflows/release.yml` ... プルリクマージ時のリリースノート作成

#### 手動でのリリースノート追加
##### リリースノート記述ファイル

release-note-latest.md ファイルに記載する

##### リリースノートの追加コマンド
- 前提
  - jqコマンドがインストールされていること
  - GitHub CLI がインストールされていること
  - gh auth login で 本リポジトリを管理しているアカウントにログインしていること

下記のスクリプトを実行。

```
npm run add-github-releases
```


### vercel

ブランチを push したときにデプロイのパイプラインが実行される。

| ブランチ | 環境       | URL                                                  |
| -------- | ---------- | ---------------------------------------------------- |
| develop  | プレビュー | https://comment-atlatl-pqffaaoay-hkj-hub.vercel.app/ |
| main     | プロダクト | https://comment-atlatl.vercel.app/                   |

#### vercel用のデプロイ設定

実行環境は package.json の `engines` で指定。
ビルド時 および 実行環境 での環境変数は vercel.json の `env` で指定。
ビルド時の npm バージョンは package.json の `packageManager` で指定。※実験的機能。要環境変数設定

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

### Diagrams

#### 利用準備

chocolatey と pip を使ってインストールする手順

```
choco install graphviz -y
choco install python -y
pip install diagrams
```

#### 利用

`docs/diagrams/deploy.py`に本文を記載する。
その後、`npm run build-diagrams`で画像を生成できる。
[参考: classmethod](https://dev.classmethod.jp/articles/diagrams-introduction/)

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
