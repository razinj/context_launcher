// Models
import { AppDetails } from './app-details'

export type RecentAppDetails = AppDetails & { icon: string }

export type RecentAppDetailsOptionalIcon = AppDetails & { icon?: string }
