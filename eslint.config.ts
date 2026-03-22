import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommendedConfig: eslint.configs.recommended,
})

export default defineConfig([
  ...compat.config({
    env: {
      node: true,
      es6: true,
    },
    root: true,
    ignorePatterns: [
      'node_modules',
      'dist',
      'commitlint.config.cjs',
      'eslint.config.ts',
      'prettier.config.ts',
      'tests/fixtures/**/routes.ts',
      'tests/fixtures/**/customRoutes.ts',
      'tests/fixtures/custom/custom-route-generator/routes/**/*.ts',
    ],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: ['./packages/**/tsconfig.json', './tests/tsconfig.json', './tests/esm/tsconfig.json'],
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      semi: ['error', 'never'],
      '@typescript-eslint/triple-slash-reference': [
        'error',
        {
          path: 'always',
          types: 'prefer-import',
          lib: 'always',
        },
      ],
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
      eqeqeq: ['error', 'smart'],
    },
    overrides: [
      {
        files: ['./packages/runtime/src/decorators/*.ts'],
        rules: {
          '@typescript-eslint/no-unused-vars': 'off',
        },
      },
      {
        files: ['tests/**/*.ts'],
        rules: {
          '@typescript-eslint/no-empty-object-type': 'off',
          '@typescript-eslint/require-await': 'off',
          '@typescript-eslint/no-floating-promises': 'off',
          '@typescript-eslint/no-unnecessary-type-assertion': 'off',
          '@typescript-eslint/no-unsafe-call': 'off',
          '@typescript-eslint/no-unused-vars': 'off',
          '@typescript-eslint/only-throw-error': 'off',
          '@typescript-eslint/prefer-promise-reject-errors': 'off',
          'no-unsafe-optional-chaining': 'off',
        },
      },
      {
        files: ['packages/cli/src/cli.ts', 'packages/runtime/src/routeGeneration/templates/hapi/hapiTemplateService.ts'],
        rules: {
          '@typescript-eslint/no-unsafe-call': 'off',
        },
      },
    ],
  }),
])
