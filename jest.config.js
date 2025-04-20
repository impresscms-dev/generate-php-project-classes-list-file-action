export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  verbose: true,
  testTimeout: 60000, // 60 seconds timeout for tests
  transform: {
    '\\.ejs$': '<rootDir>/build-tools/jest-ejs-transformer.cjs'
  }
};
