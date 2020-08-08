'use strict';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./__tests__/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: ['src/**/*.ts?(x)', '!src/index.tsx'],
  testMatch: ['<rootDir>/__tests__/**/*.spec.ts?(x)'],
  coverageProvider: 'v8',
};
