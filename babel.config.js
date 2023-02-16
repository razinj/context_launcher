/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    'module:metro-react-native-babel-preset',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: ['react-native-reanimated/plugin'],
}
