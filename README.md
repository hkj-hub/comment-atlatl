# Comment Atlatl

Anyone wants to comment.
A project that wants to make such a mechanism.

[Japanese Readme](./README-ja.md)

[developper documents](https://hkj-hub.github.io/comment-atlatl/ja/introduction/)

[github](https://github.com/hkj-hub/comment-atlatl)

[demo](https://comment-atlatl.vercel.app/)

<img src="https://repository-images.githubusercontent.com/661897641/86ae75db-d974-463b-a1c5-984fd07da2b1" />

## Usage

1. login [skyway](https://console.skyway.ntt.com/login)
1. check your application `secret key` and `application id`
1. create .env.local
   ```
   SECRET_TOKEN=your skyway secret key
   APPLICATION_TOKEN=your sky way application id
   APPLICATION_URL=http://localhost:3000
   ```
1. generate url with skyway token
   ```
   npm install
   npm run generate-url
   ```
1. run local server
   ```
   npm run dev
   ```
1. access generated url
