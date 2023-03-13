export type AppDetails = {
  label: string
  name: string
}

export type AppDetailsWithOptionalIcon = AppDetails & { icon?: string }

export type AppDetailsWithIcon = AppDetails & { icon: string }
