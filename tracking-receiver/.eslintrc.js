module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'never',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
