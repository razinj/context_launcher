import { APP_ITEM_HEIGHT } from '../constants'
import { AppDetails } from '../models/app-details'
import { PinnedApp } from '../models/pinned-app'

export const getAppsByName = (apps: AppDetails[], query: string): AppDetails[] => {
  return apps.filter((app: AppDetails) => app.name.match(new RegExp(query, 'gi')))
}

export const getAppIndexByPackageName = (apps: AppDetails[], appPackageName: string): number => {
  return apps.findIndex(({ packageName }: AppDetails) => packageName === appPackageName)
}

export const getAppIndexByPackageNameAndName = (
  apps: AppDetails[],
  appPackageName: string,
  appName: string
): number => {
  return apps.findIndex(({ packageName, name }: AppDetails) => packageName === appPackageName && name === appName)
}

export const getAppByPackageName = (apps: AppDetails[], appPackageName: string): AppDetails | PinnedApp | undefined => {
  return apps.find(({ packageName }: AppDetails) => packageName === appPackageName)
}

export const getAppByPackageNameAndName = (
  apps: AppDetails[],
  appPackageName: string,
  appName: string
): AppDetails | PinnedApp | undefined => {
  return apps.find(({ packageName, name }: AppDetails) => packageName === appPackageName && name === appName)
}

const getAppId = (appDetails: AppDetails): string => {
  return `${appDetails.packageName}_${appDetails.name}`.toLowerCase().replace(/[^\w]/gi, '_')
}

export const getListKey = (appDetails: AppDetails) => getAppId(appDetails)

export const getListItemLayout = (_data: unknown, index: number) => ({
  length: APP_ITEM_HEIGHT,
  offset: APP_ITEM_HEIGHT * index,
  index,
})
