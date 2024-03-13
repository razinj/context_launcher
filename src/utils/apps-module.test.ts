import LauncherAppsModule from '../native-modules/LauncherAppsModule'
import { launchApp, requestAppUninstall, showAppDetails } from './apps-module'

describe('LauncherAppsModule Tests', () => {
  const aPackageName = 'com.a_package_name'

  it('should call LauncherAppsModule.launchApplication with package name', () => {
    launchApp(aPackageName)

    expect(LauncherAppsModule.launchApplication).toBeCalledTimes(1)
    expect(LauncherAppsModule.launchApplication).toBeCalledWith(aPackageName)
  })

  it('should call LauncherAppsModule.showApplicationDetails with package name', () => {
    showAppDetails(aPackageName)

    expect(LauncherAppsModule.showApplicationDetails).toBeCalledTimes(1)
    expect(LauncherAppsModule.showApplicationDetails).toBeCalledWith(aPackageName)
  })

  it('should call LauncherAppsModule.requestApplicationUninstall with package name', () => {
    requestAppUninstall(aPackageName)

    expect(LauncherAppsModule.requestApplicationUninstall).toBeCalledTimes(1)
    expect(LauncherAppsModule.requestApplicationUninstall).toBeCalledWith(aPackageName)
  })
})
