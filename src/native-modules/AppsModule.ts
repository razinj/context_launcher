import { NativeModules } from 'react-native'

export interface AppsModuleInterface {
  getConstants(): AppsModuleConstants
  launchApplication(packageName: string): void
  showApplicationDetails(packageName: string): void
  requestApplicationUninstall(packageName: string): void
  getApplications(): Promise<string>
}

type AppsModuleConstants = {
  appVersion: string
  buildNumber: string
  packageName: string
}

const { AppsModule } = NativeModules

export default AppsModule as AppsModuleInterface
