import path from 'path';
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // https://techblog.roxx.co.jp/entry/2022/08/08/130000
    externalDir: true,
  },
  webpack: (config, { isServer }) => {
    config.experiments = { asyncWebAssembly: true, layers: true };
    const wasmPathPrefix = isServer ? '../' : '';
    config.output.webassemblyModuleFilename = `${wasmPathPrefix}static/wasm/webassembly.wasm`;
    config.resolve.alias['@'] = path.join(__dirname, 'src');

    // https://github.com/vercel/next.js/issues/64792
    // fix warnings for async functions in the browser (https://github.com/vercel/next.js/issues/64792)
    if (!isServer) {
      config.output.environment = { ...config.output.environment, asyncFunction: true };
    }

    return config;
  },
  // https://nextjs.org/docs/pages/api-reference/next-config-js/headers https://kajiri.dev/using-ffmpeg-wasm-with-nextjs
  // SharedArrayBufferを使うため、ヘッダに Cross-Origin-Opener-Policy を追加
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless', // 'require-corp', だと  https://vercel.live/_next-live/feedback/feedback.js net::ERR_BLOCKED_BY_RESPONSE.NotSameOriginAfterDefaultedToSameOriginByCoep が発生する
          },
        ],
      },
    ];
  },
  // https://ja.next-community-docs.dev/docs/app/api-reference/next-config-js/eslint
  // https://blog.linotte.dev/eslint-9-next-js-935c2b6d0371
  eslint: {
    ignoreDuringBuilds: false,
  },
  // https://zenn.dev/okumura_daiki/articles/e91fc78010c46c
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  distDir: '../../.next',
};

module.exports = nextConfig;
