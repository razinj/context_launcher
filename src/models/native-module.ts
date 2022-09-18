export interface AppsModuleInterface {
  launchApplication(packageName: string): void
  showApplicationDetails(packageName: string): void
  requestApplicationUninstall(packageName: string): void
  getApplications(callback: (applications: string) => void): void
  getApplicationIcon(packageName: string, callback: (nativeAppIcon: string) => void): void
}
