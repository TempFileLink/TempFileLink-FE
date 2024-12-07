import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default withNuxt([
  // Note: https://github.com/nuxt/eslint/issues/518
  {
    rules: {
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'vue/no-multiple-template-root': 'off',
    },
  },
  eslintConfigPrettier,
  includeIgnoreFile(gitignorePath),
]);
