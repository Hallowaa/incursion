import antfu from '@antfu/eslint-config'
import babelEslintParser from '@babel/eslint-parser'
import typescriptEslintParser from '@typescript-eslint/parser'
import eslintJsdocPlugin from 'eslint-plugin-jsdoc'
import vueEslintParser from 'vue-eslint-parser'

export default antfu(
  {
    ignores: [
      'playwright.config.ts',
      '.eslintrc.cjs',
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '**/fonts/**',
      '**/*.test.ts'
    ],
    javascript: {
      overrides: {
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_',
            caughtErrors: 'none'
          }
        ],
        'no-restricted-syntax': ['error', 'TSExportAssignment'],
        'prefer-exponentiation-operator': ['off']
      }
    },
    typescript: {
      overrides: {
        'ts/no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'none',
            caughtErrors: 'none',
            ignoreRestSiblings: true
          }
        ]
      }
    },
    vue: {
      overrides: {
        'vue/comma-dangle': ['error', 'never']
      }
    },
    stylistic: {
      indent: 2,
      overrides: {
        'object-shorthand': ['error', 'properties'],
        'style/indent': ['error', 2],
        'style/indent-binary-ops': ['error', 2],
        'style/comma-dangle': ['error', 'never'],
        'style/brace-style': ['error', '1tbs'],
        'style/arrow-parens': ['error', 'always'],
        'style/operator-linebreak': [
          'error',
          'before',
          {
            overrides: {
              '=': 'after',
              '&&': 'after',
              '||': 'after',
              '??': 'after',
              '==': 'after',
              '!=': 'after',
              '===': 'after',
              '!==': 'after'
            }
          }
        ],
        'style/quote-props': ['error', 'as-needed'],
        'antfu/if-newline': 'off'
      }
    }
  },
  {
    files: ['**/barrel.ts'],
    rules: {
      'unused-imports/no-unused-vars': 'off',
      'ts/no-unused-vars': 'off'
    }
  },
  {
    files: ['**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}'],
    ignores: [
      'playwright.config.ts',
      '.eslintrc.cjs',
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '**/*.test.ts'
    ],
    plugins: {
      jsdoc: eslintJsdocPlugin
    },
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        requireConfigFile: false,
        parser: {
          js: babelEslintParser,
          jsx: babelEslintParser,
          ts: typescriptEslintParser,
          tsx: typescriptEslintParser,
          mjs: babelEslintParser
        }
      },
      globals: {
        browser: true,
        node: true
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    rules: {
      'jsdoc/check-indentation': 'error',
      'jsdoc/check-line-alignment': 'error',
      'jsdoc/check-syntax': 'error',
      'jsdoc/match-description': 'error',
      'jsdoc/no-bad-blocks': 'error',
      'jsdoc/no-blank-block-descriptions': 'error',
      'jsdoc/no-defaults': 'error',
      'jsdoc/no-types': 'error',
      'jsdoc/require-jsdoc': 'error',
      'jsdoc/require-asterisk-prefix': 'error',
      'jsdoc/require-description': 'error',
      'jsdoc/require-description-complete-sentence': 'error',
      'jsdoc/require-hyphen-before-param-description': 'error',
      'jsdoc/require-throws': 'error',
      'jsdoc/sort-tags': 'error',
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: []
        }
      ]
    },
    settings: {
      jsdoc: {
        mode: 'typescript'
      }
    }
  }
)
