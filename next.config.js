const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // 開発サーバのヘッダに Cross-Origin-Opener-Policy を追加
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
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
