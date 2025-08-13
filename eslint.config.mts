import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import playwright from 'eslint-plugin-playwright';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  globalIgnores(['html*', 'playwright-report', 'test-results', 'node_modules']),
  {
    ...pluginJs.configs.recommended,
    ...playwright.configs['flat/recommended'],
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
      playwright: playwright.configs['flat/recommended'].plugins.playwright
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'no-unused-vars': 'off',
      '@stylistic/js/indent': 'off',
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: false }],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'always'],
      '@stylistic/js/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/js/space-before-function-paren': ['error', 'never'],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      'no-unused-vars': 0,
      '@stylistic/js/indent': ['error', 4, { 'SwitchCase': 4 }],
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/arrow-spacing': [2, { 'before': true, 'after': true }],
      'no-undef': 'warn'
    },
  },
]);