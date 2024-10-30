import path from 'path';
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    config.output.webassemblyModuleFilename =
      (isServer ? '../' : '') + 'static/wasm/webassembly.wasm';
    config.resolve.alias['@'] = path.join(__dirname, 'src');

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
            value: 'require-corp',
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
};

module.exports = nextConfig;
