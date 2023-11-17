export default {
  setupFiles: ['../jest.polyfills.js'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  rootDir: 'src',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'mjs',
    'cjs',
    'jsx',
    'json',
    'node',
  ],
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^@src/(.*)$': '<rootDir>/$1',
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
  },
};
