module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx', '.graphql'],
  moduleDirectories: ['src', 'node_modules'],
  rootDir: 'src',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  testRegex: '\\.spec.(ts|tsx)$',
  setupFilesAfterEnv: ['../jest.setup.js'],
  coverageDirectory: '../coverage',
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  silent: false,
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$':
      '<rootDir>/../../../node_modules/jest-css-modules',
  },
};
