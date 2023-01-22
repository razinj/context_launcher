import { launchApp, requestAppUninstall, showAppDetails } from './apps-module'
import AppsModule from '../native-modules/AppsModule'

jest.mock('react-native', () => {
  const ReactNative = jest.requireActual('react-native')

  ReactNative.NativeModules.AppsModule = {
    launchApplication: jest.fn(),
    showApplicationDetails: jest.fn(),
    requestApplicationUninstall: jest.fn(),
  }

  return ReactNative
})

describe('AppsModule Tests', () => {
  const aPackageName = 'com.a_package_name'

  beforeAll(() => {
    jest.spyOn(AppsModule, 'launchApplication')
    jest.spyOn(AppsModule, 'showApplicationDetails')
    jest.spyOn(AppsModule, 'requestApplicationUninstall')
  })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should call AppsModule.launchApplication with package name', () => {
    launchApp(aPackageName)

    expect(AppsModule.launchApplication).toBeCalledTimes(1)
    expect(AppsModule.launchApplication).toBeCalledWith(aPackageName)
  })

  it('should call AppsModule.showApplicationDetails with package name', () => {
    showAppDetails(aPackageName)

    expect(AppsModule.showApplicationDetails).toBeCalledTimes(1)
    expect(AppsModule.showApplicationDetails).toBeCalledWith(aPackageName)
  })

  it('should call AppsModule.requestApplicationUninstall with package name', () => {
    requestAppUninstall(aPackageName)

    expect(AppsModule.requestApplicationUninstall).toBeCalledTimes(1)
    expect(AppsModule.requestApplicationUninstall).toBeCalledWith(aPackageName)
  })
})
