import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    //  Cannot find module '@dimforge/rapier2d' の対応。 compatを代わりに使用する
    // https://qiita.com/ShinKano/items/d5d6ee0fdef823d075bb
    // https://rapier.rs/docs/user_guides/javascript/getting_started_js
    '@dimforge/rapier2d': '<rootDir>/tests/rapierMock.js',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./tests/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  coveragePathIgnorePatterns: ['<rootDir>/.*\\.m?js$', '/mock/', '/tests/'],
  collectCoverage: true,
  coverageDirectory: '../../docs/astro/public/comment-atlatl-jest-coverage',

  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: '../../docs/astro/public/comment-atlatl-jest-reports',
        filename: 'jest.html',
      },
    ],
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
