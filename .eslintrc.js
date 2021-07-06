module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
  },
  extends: ['plugin:vue/essential'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-empty': 0,
    'no-irregular-whitespace': 0,
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2, { VariableDeclarator: { var: 2, let: 2, const: 3 }, SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],

    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
