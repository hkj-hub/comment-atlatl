---
title: Vercel 設定
description: Vercelの設定
layout: ../../../../layouts/MainLayout.astro
---

# Vercel 設定

## npm install コマンドの変更

`@storybook/nextjs: ^8.3.6`と`next: 15.0.1`の間で不整合が起きており、`npm install`でエラーとなる。
一時的な不整合のため、`npm install --force`で暫定回避を行う。

The setting present under Project → Settings → General → Build & Development Settings.

![](/comment-atlatl/images/settings/vercel-settings-1.png)
![](/comment-atlatl/images/settings/vercel-settings-2.png)
