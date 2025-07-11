import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // import sorting
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // pure side-efect stuff like css
            ['^\\u0000'],
            // external with React first
            ['^react', '^@?\\w'],
            // Absolute imports
            ['^@/'],
            // Relative imports
            ['^\\.'],
            // Types
            ['^.+\\u0000$', '^.+ as \\w+'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;
