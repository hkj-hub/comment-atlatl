import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import pluginNext from '@next/eslint-plugin-next';
import { config as baseConfig } from './base.js';
import storybook from 'eslint-plugin-storybook';
import unuserdPlugin from 'eslint-plugin-unused-imports';
import sonarjs from 'eslint-plugin-sonarjs';
import importPlugin from 'eslint-plugin-import';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...storybook.configs['flat/recommended'],
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      'react/react-in-jsx-scope': 'off',
    },
  },

  {
    plugins: {
      'unused-imports': unuserdPlugin,
      sonarjs,
    },
    rules: {
      semi: ['error', 'always'],
      complexity: ['error', 7], // 複雑度の設定
      // unuserd-importsのrecommended設定を適用
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      // ここまで unuserd-importsのrecommended設定を適用
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ], // importの並び順の設定
          pathGroupsExcludedImportTypes: ['builtin'],
          pathGroups: [{ pattern: '@src/**', group: 'parent', position: 'before' }], // エイリアスの位置を指定
          alphabetize: { order: 'asc' }, // グループ内のソート順
        },
      ],
      'import/prefer-default-export': ['off'],
      'import/extensions': ['off'],
      'import/no-unresolved': ['off'],
      'react/prop-types': ['off'],
      'turbo/no-undeclared-env-vars': ['off'],
    },
  },
];
