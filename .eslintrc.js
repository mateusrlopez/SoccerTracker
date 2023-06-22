module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'max-classes-per-file': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'interface',
          'format': [
            'PascalCase'
          ],
          'custom': {
            'regex': '^I[A-Z]',
            'match': true
          }
        }
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': 'never'
      }
    ],
    'import/no-extraneous-dependencies': [
        'error',
        {
            'packageDir': __dirname,
            'devDependencies': [
                '**/*.spec.ts',
                '**/*.config.ts'
            ]
        }
    ]
  },
};
