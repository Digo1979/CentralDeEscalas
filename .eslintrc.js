module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'vue/html-indent': ['warn', 2],
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-useless-escape': 1,
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 1,
    "vue/script-indent": ['warn', 2],
  },
}
