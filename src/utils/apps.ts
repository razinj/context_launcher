import { APP_ITEM_HEIGHT } from '../constants'
import { AppDetails } from '../models/app-details'
import { PinnedApp } from '../models/pinned-app'

export const getAppsByLabel = (apps: AppDetails[], query: string): AppDetails[] => {
  return apps.filter((app: AppDetails) => app.name.match(new RegExp(query, 'gi')))
}

export const getAppIndex = (apps: AppDetails[], appPackageName: string): number => {
  return apps.findIndex(({ packageName }: AppDetails) => packageName === appPackageName)
}

export const getApp = (apps: AppDetails[], appPackageName: string): AppDetails | PinnedApp | undefined => {
  return apps.find(({ packageName }: AppDetails) => packageName === appPackageName)
}

export const getListKey = ({ packageName }: AppDetails) => packageName

export const getListItemLayout = (_data: unknown, index: number) => ({
  length: APP_ITEM_HEIGHT,
  offset: APP_ITEM_HEIGHT * index,
  index,
})
