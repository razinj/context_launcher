import LauncherAppsModule from '../native-modules/LauncherAppsModule'

export const launchApp = (packageName: string) => LauncherAppsModule.launchApplication(packageName)

export const showAppDetails = (packageName: string) => LauncherAppsModule.showApplicationDetails(packageName)

export const requestAppUninstall = (packageName: string) => LauncherAppsModule.requestApplicationUninstall(packageName)
