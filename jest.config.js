const path = require('path');

module.exports = {
  rootDir: __dirname,
  reporters: ['default'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/*.(spec|test).(ts|tsx)', '**/__tests__/*.(ts|tsx)', '!/build/', '!/dist/'],
  testURL: 'http://localhost/',
  collectCoverage: false,
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['**/*.(ts|tsx)', '!**/*.d.ts'],
  cache: false,
  setupFilesAfterEnv: [path.resolve(__dirname, './jest.setup-after-env.js')],
  testEnvironment: 'node',
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        sourceMap: true,
        inlineSourceMap: true
      },
      diagnostics: true
    }
  }
};
