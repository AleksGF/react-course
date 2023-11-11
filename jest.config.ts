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
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/$1',
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$1',
    '^@constants/(.*)$': '<rootDir>/constants/$1',
    '^@services/(.*)$': '<rootDir>/services/$1',
    '^@helpers/(.*)$': '<rootDir>/helpers/$1',
  },
};
