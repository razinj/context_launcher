// src: https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/#with-jest-setup-file
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

// src: https://github.com/rt2zz/redux-persist/issues/1243#issuecomment-692609748
jest.mock('redux-persist', () => {
  return {
    ...jest.requireActual('redux-persist'),
    persistStore: jest.fn(),
    persistReducer: jest.fn().mockImplementation((_config, reducers) => reducers),
  }
})

jest.mock('react-native', () => {
  const ReactNative = jest.requireActual('react-native')

  ReactNative.NativeModules.AppsModule = {
    getConstants: () => ({
      packageName: 'com.razinj.context_launcher',
      appVersion: '1.4.8',
      buildNumber: '12',
    }),
    launchApplication: jest.fn(),
    showApplicationDetails: jest.fn(),
    requestApplicationUninstall: jest.fn(),
    getApplications: jest.fn(),
  }

  return ReactNative
})
