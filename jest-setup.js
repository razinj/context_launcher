// src: https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/#with-jest-setup-file
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

// src: https://github.com/rt2zz/redux-persist/pull/1239
jest.mock('redux-persist/lib/createPersistoid', () =>
  jest.fn(() => ({
    update: jest.fn(),
    flush: jest.fn(),
  }))
)

jest.mock('redux-persist/lib/persistStore', () =>
  jest.fn(() => ({
    persistStore: jest.fn(),
  }))
)

jest.mock('react-native', () => {
  const ReactNative = jest.requireActual('react-native')

  ReactNative.NativeModules.AppsModule = {
    getConstants: () => ({
      packageName: 'package_name',
      appVersion: 'app_version',
      buildNumber: 'build_number',
    }),
    launchApplication: jest.fn(),
    showApplicationDetails: jest.fn(),
    requestApplicationUninstall: jest.fn(),
    getApplications: jest.fn(),
  }

  return ReactNative
})

// src: https://stackoverflow.com/questions/61639734/react-native-vector-icons-materialicons-jest-expo-snapshot-test-error-with-types
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon')
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon')
