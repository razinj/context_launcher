// Models
import { AppDetailsWithIcon } from './app-details'

export type PinnedApp = AppDetailsWithIcon & {
  isPermanent: boolean
  isTemporary: boolean
}

export type TemporaryPinnedAppsConfig = {
  startDate?: string
  endDate?: string
}

export type PinnedAppsState = {
  list: PinnedApp[]
  temporaryAppsConfig: TemporaryPinnedAppsConfig
}
