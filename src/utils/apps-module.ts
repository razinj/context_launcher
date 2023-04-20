import AppsModule from '../native-modules/AppsModule'

export const launchApp = (packageName: string) => AppsModule.launchApplication(packageName)

export const showAppDetails = (packageName: string) => AppsModule.showApplicationDetails(packageName)

export const requestAppUninstall = (packageName: string) => AppsModule.requestApplicationUninstall(packageName)
