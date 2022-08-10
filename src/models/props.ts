// React
import { ReactNode } from 'react'
// Models
import { AppDetails } from './app-details'
import { RenderedIn } from './rendered-in'

export type AppItemProps = {
  appDetails: AppDetails
  renderedIn: RenderedIn
  appIcon?: string
}

export type HighlightTextProps = {
  text: string
  highlightValue?: string
}

export type SearchContextWrapperProps = {
  children: ReactNode
}

export type GlobalContextWrapperProps = {
  children: ReactNode
}

export type PackageChange = {
  packageName: string
}
