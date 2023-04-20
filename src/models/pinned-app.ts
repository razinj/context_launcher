import { AppDetails } from './app-details'

export type PinnedApp = AppDetails

export type TemporaryPinnedAppsConfig = {
  startDate?: string
  endDate?: string
}

export type PinnedAppsState = {
  list: PinnedApp[]
  temporarily: PinnedApp[]
  temporaryAppsConfig: TemporaryPinnedAppsConfig
}
