/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    'module:metro-react-native-babel-preset',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console', 'react-native-paper/babel'],
    },
  },
  plugins: ['react-native-reanimated/plugin'],
}
