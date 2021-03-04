const fs = require('fs');
const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'prettier',
    'react',
    'react-hooks',
    'graphql',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    'no-console': 2,
    '@typescript-eslint/explicit-function-return-type': 'off',
    "@typescript-eslint/explicit-module-boundary-types": "off",
    '@typescript-eslint/interface-name-prefix': 'off',
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaString: fs.readFileSync(
          path.join(__dirname, 'packages', 'server', 'schema.gql'),
          { encoding: 'utf-8' },
        ),
      },
    ],
  },
};
