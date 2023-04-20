import AppsModule from '../native-modules/AppsModule'

// Constant values
export const { packageName: APP_ID, appVersion: APP_VERSION, buildNumber: APP_BUILD_NUMBER } = AppsModule.getConstants()
export const APP_ITEM_HEIGHT = 60
export const BOTTOM_CONTAINER_HEIGHT = 48.8
export const BOTTOM_CONTAINER_HEIGHT_WITH_PADDINGS = BOTTOM_CONTAINER_HEIGHT + 10
// Colors
export const WHITE_COLOR = '#FFFFFF'
export const PRIMARY_COLOR = '#42855B'
export const SECONDARY_COLOR = '#A0C2AD'
export const NEUTRAL_COLOR = '#424242'
export const DISABLED_COLOR = '#D3D3D3'
export const BACKGROUND_COLOR = 'rgba(255, 255, 255, .2)'
export const PRESSABLE_RIPPLE_COLOR = 'rgba(255, 255, 255, .3)'
// Native
export const HARDWARE_BACK_PRESS_EVENT_NAME = 'hardwareBackPress'
