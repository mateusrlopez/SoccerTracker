const { pathsToModuleNameMapper } = require('ts-jest/utils');
const compilerOptions = require('../tsconfig.json');

module.exports = {
    displayName: 'E2E Tests',
    rootDir: '..',
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
    preset: 'ts-jest',
    setupFiles: ['dotenv/config'],
    testEnvironment: 'node',
    testMatch: ['<rootDir>/test/e2e/**/*.e2e-spec.ts'],
};
