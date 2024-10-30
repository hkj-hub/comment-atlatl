---
title: comment-atlatl
description: Comment Thrower
layout: ../../layouts/MainLayout.astro
---

## 概要

コメントを投げたくなるような仕組みを作りたい。

## ブランチ戦略

- 簡易 gitflow
- id/{issue 番号}/\* で develop ブランチから feature ブランチを作成して作業
- main ブランチへのマージは release/\* ブランチからのみ行う。
  - release/\* ブランチ作成時にはステージング環境へのデプロイを行う
  - main ブランチへのマージ時には本番環境へのデプロイを行う
  - main ブランチにマージしたタイミングでタグをつける

<pre class="mermaid">

gitGraph
    commit tag: "0.1"
    branch develop order: 3
    commit
    branch id/1/featureA order: 4
    branch id/2/featureB order: 5
    commit
    checkout develop
    commit
    checkout id/1/featureA
    commit
    checkout id/2/featureB
    commit
    checkout id/1/featureA
    commit
    checkout develop
    merge id/1/featureA
    branch release/0.2.0
    checkout release/0.2.0
    commit
    checkout main
    merge release/0.2.0 tag: "v0.2"
    checkout id/2/featureB
    merge develop
    commit
    checkout id/2/featureB
    commit
    checkout develop
    merge id/2/featureB
</pre>

[参考](https://enu23456.hatenablog.com/entry/2022/12/07/195555)

## デプロイフロー

![](/comment-atlatl/images/deploy.png)

## リンク

[github](https://github.com/hkj-hub/comment-atlatl)  
[vercel](https://vercel.com/hkjhubs-projects/comment-atlatl-7jhx)

[skyway - docs](https://skyway.ntt.com/ja/docs/user-guide/introduction/)
[skyway - api](https://github.com/skyway/skyway-webrtc-gateway/blob/master/api/api.yaml)

## 利用素材

[favicon - sun spear icon](https://game-icons.net/1x1/delapouite/sun-spear.html)
