module.exports = {
  root: true,
  globals: {
    window: true,
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    requireConfigFile: false,
    sourceType: "module",
  },

  rules: {
    semi: 2
  }
};
