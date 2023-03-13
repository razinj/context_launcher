const { defaults: tsjPreset } = require('ts-jest/presets')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  transformIgnorePatterns: ['node_modules/(?!(@react-native|react-native|react-native-vector-icons))'],
  cacheDirectory: '.jest/cache',
  setupFiles: ['./jest-setup.js'],
  setupFilesAfterEnv: [
    './jest-tests-setup.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js', // src: https://docs.swmansion.com/react-native-gesture-handler/docs/guides/testing
  ],
}
