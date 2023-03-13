// Models
import { AppDetails, AppDetailsWithIcon } from '../models/app-details'
import { PinnedApp } from '../models/pinned-app'

export const getAppsByLabel = (apps: AppDetails[], query: string): AppDetails[] => {
  return apps.filter((app: AppDetails) => app.label.match(new RegExp(query, 'gi')))
}

export const getPinnedAppByName = (pinnedApps: PinnedApp[], appDetails: AppDetailsWithIcon): PinnedApp => {
  const pinnedApp = pinnedApps.find(({ name }: PinnedApp) => name === appDetails.name)

  if (pinnedApp) return pinnedApp

  return { ...appDetails, isTemporary: false, isPermanent: false }
}
