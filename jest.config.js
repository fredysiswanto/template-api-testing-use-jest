/** @type {import('jest').Config} */
require('module-alias/register');
const config = {
  moduleNameMapper: {
    // '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    // '^[./a-zA-Z0-9$_-]+\\.png$': '<rootDir>/RelativeImageStub.js',
    // 'module_name_(.*)': '<rootDir>/substituted_module_$1.js',
    // 'assets/(.*)': [
    //   '<rootDir>/images/$1',
    //   '<rootDir>/photos/$1',
    //   '<rootDir>/recipes/$1',
    // ],

    '@config/(.*)$': '<rootDir>/config/$1',
    '@testApi/(.*)$': '<rootDir>/test/api/$1',
    '@srcApi/(.*)$': '<rootDir>/src/api/$1',
    '@dataTest/(.*)$': '<rootDir>/data-test/$1',
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports',
        filename: 'report.html',
        openReport: false,
        includeConsoleLog: false,
      },
    ],
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/config/setup-jest.js'],
};

module.exports = config;
