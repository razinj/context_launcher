// React Native
import { NativeModules } from 'react-native'

const { AppsModule } = NativeModules

interface AppsInterface {
  launchApplication(packageName: string): void
  showApplicationDetails(packageName: string): void
  requestApplicationUninstall(packageName: string): void
  getApplications(callback: (applications: string) => void): void
  getApplicationIcon(packageName: string, callback: (nativeAppIcon: string) => void): void
}

export default AppsModule as AppsInterface
