/** @type {import('jest').Config} */
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

    '@config': '<rootDir>/utils/config.js',
    '@testApi': '<rootDir>/test/api',
    '@apiScr': '<rootDir>src/api',
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports',
        filename: 'report.html',
        openReport: true,
      },
    ],
  ],
};

module.exports = config;
