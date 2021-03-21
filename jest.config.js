const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    clearMocks: true,
    collectCoverageFrom: ['<rootDir>/src/**'],
    coverageDirectory: '<rootDir>/test/coverage',
    displayName: 'Unit Tests',
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
    preset: 'ts-jest',
    setupFiles: ['dotenv/config'],
    testEnvironment: 'node',
    testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
};
