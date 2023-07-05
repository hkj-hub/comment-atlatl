# Comment Atlatl

Anyone wants to comment.
A project that wants to make such a mechanism.

[developper documents](https://hkj-hub.github.io/comment-atlatl/ja/introduction/)

[demo](https://comment-atlatl.vercel.app/)

## Usage

1. login [skyway](https://console.skyway.ntt.com/login)
1. check your application `secret key` and `application id`
1. create .env.local
   ```
   SECRET_TOKEN=your skyway secret key
   APPLICATION_TOKEN=your sky way application id
   ```
1. generate url with skyway token
   ```
   npm install
   npm run generate-url
   ```
