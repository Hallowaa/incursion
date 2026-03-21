import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'dist/**',
    'node_modules/**'
  ],
  vue: false,
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
  rules: {
    'node/prefer-global/process': 'off'
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
})
