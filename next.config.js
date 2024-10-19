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

    // kuzu-wasm の mjs ファイルを読み込むための設定
    config.optimization.minimizer = [
      new TerserPlugin({
        exclude: /kuzu-wasm/,
      }),
    ];

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
};

module.exports = nextConfig;
