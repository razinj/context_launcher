import { AppDetails } from './app-details'

export type FavoriteAppDetails = AppDetails & { icon: string }

export type FavoriteApp = {
  appDetails: FavoriteAppDetails
  order: number
}
