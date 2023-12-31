module.exports = {
  env: { browser: true, es2020: true },
  extends: ['next/core-web-vitals', 'plugin:storybook/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: [],
  rules: {},
};
