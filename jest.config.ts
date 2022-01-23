import { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import * as tsconfig from './tsconfig.json';

const config: Config.InitialOptions = {
    clearMocks: true,
    displayName: 'Unit Tests',
    moduleFileExtensions: ['js', 'json', 'js'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>' }),
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
};

export default config;
