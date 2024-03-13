import { NativeModules } from 'react-native'

interface LauncherAppsModuleInterface {
  getConstants(): AppsModuleConstants
  launchApplication(packageName: string): void
  showApplicationDetails(packageName: string): void
  requestApplicationUninstall(packageName: string): void
  getApplications(): Promise<string>
  getApplicationsV2(callback: (apps: string) => void): void
  getApplicationsV3(): void
}

interface AppsModuleConstants {
  appId: string
  appVersion: string
  buildNumber: string
  isDebugBuild?: boolean
}

const { LauncherAppsModule } = NativeModules

export default LauncherAppsModule as LauncherAppsModuleInterface
