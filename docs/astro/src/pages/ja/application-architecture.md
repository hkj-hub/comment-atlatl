---
title: 技術選定
description: アプリケーションの設計
layout: ../../layouts/MainLayout.astro
---

# 概要

下記サイトの１章を参考に、本アプリケーションの設計を検討した。

[React Application Architecture for Production〜これ一冊で全てが網羅〜](https://qiita.com/taisei-13046/items/64f764ad2d2caaf4d7d4)

# アプリケーション設計

## Project の構造

下記を参考に検討している。 FSD を Next 用に調整する。

| 手法                                                                                           | 特徴                                     
| ---------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [Feature Sliced Design](https://zenn.dev/kyuki/articles/d736b0957e6336)                        | フロントエンド向けの階層構造             |
| [Bulletproof-react](https://zenn.dev/ukkyon/articles/03893da1dbf825)                           | 「特化」と「汎化」を意識した直観的な構造 |
| [domain-driven design](https://zenn.dev/yamachan0625/books/ddd-hands-on/viewer/chapter1_intro) | 複雑な業務要件に立ち向かう構造           |

## State の管理

| 要件                                     | 選択肢                         | 採用 |
| ---------------------------------------- | ------------------------------ | ---- |
| State が頻繁に更新される                 | atom-based (ex. Recoil, Jotai) |
| 異なる多くの State を Component 間で共有 | redux(ex. redux-toolkit)       | 〇   |
| 特別な要件がない                         | Zustand,React Context          |

今回のアプリケーションではいくつかの State を管理する。特に p2p の peer 情報は多くの Component から参照される。
そのため、redux-toolkit を選定する。

| 状態         | 説明                                                         | 管理     |
| ------------ | ------------------------------------------------------------ | -------- |
| 入力フォーム | コメントを投稿するフォーム                                   | useState |
| p2p          | skyway によって p2p 通信を行うための peer 情報（ユーザ識別） | rtk      |
| simulator    | コメントを物理演算して表示するためのコメント一覧             | rtk      |
| messages     | コメント履歴を表示するためのコメント一覧                     | rtk      |
| graph        | グラフ DB の描画用の状態                                     | rtk      |

## Styling はどのように行う？

build 時の CSS 解決が必要かどうかについて下記の観点で検討する。

- 頻繁な再レンダリング
- パフォーマンスの重要性

build 時の CSS 解決が必要な場合は Tailwind や vanilla css が選択肢となる。  
今回は CSS で解決したい要件がないため、CSS の管理スコープが小さくなることを重視し CSS モジュール を採用した。

その後、CSSモジュールを作るほどではないがメディアクエリを簡単に使いたい場面が発生したため、Tailwindを補助的に採用した。


## レンダリング戦略

高いパフォーマンスと SEO が必要な場合は`Server-side rendering`(SSR)が求められる。

今回は一般公開用ではなく、SEO を気にする必要もないため`Client-side rendering`(CSR)を採用する。

# Routing

`Pages Router`を採用。[*](https://nextjs.org/docs/pages)

Reactの最新機能を利用する要件がまだ存在しないため。

## ページごとに最適化したレンダリング戦略
参考先では下記のように分けている。

- 誰もが閲覧可能なページ ... SEOを意識
  - Server-side rendering（SSR）
- 管理者用のページ ... サーバ側の負荷軽減
  - Client-side rendering（CSR）

本アプリケーションではSEOを意識しないため、全ページ `CSR` を採用した。

# テスト設計

テストに利用するライブラリは利用者の多さから下記とした。

| テスト種別               | スコープ                                                                             | ライブラリ                 |
| ------------------------ | ------------------------------------------------------------------------------------ | -------------------------- |
| モジュール単体テスト     | 他のモジュールに依存しないテスト                                                     | Jest                       |
| コンポーネント結合テスト | 複数モジュールを組み合わせて実装されたコンポーネントを対象とするテスト               | Jest,React Testing Library |
| E2E テスト               | アプリケーション全体のテスト。正常系のケースをバックエンドとの通信を含めてテストする | -                          |
