import { nextJsConfig } from '@comment-atlatl/eslint-config/my-next-js';

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  {
    files: ['pages/*.tsx'],
    rules: {
      '@conarti/feature-sliced/layers-slices': ['off'],
      '@conarti/feature-sliced/absolute-relative': ['off'],
      '@conarti/feature-sliced/public-api': ['off'],
    },
  },
];
