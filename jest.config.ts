import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    displayName: 'Unit tests',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'ts'],
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    clearMocks: true,
};

export default config;
