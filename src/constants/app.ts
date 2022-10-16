// Modules
import AppsModule from '../native-modules/AppsModule'

// Constant values
const { appVersion, buildNumber, packageName } = AppsModule.getConstants()

// Values
export const CONTEXT_LAUNCHER_APP_ID = packageName
export const CONTEXT_LAUNCHER_APP_VERSION = appVersion
export const CONTEXT_LAUNCHER_APP_BUILD_NUMBER = buildNumber
export const APP_ITEM_HEIGHT_ICON_DISPLAYED = 60
export const APP_ITEM_HEIGHT_ICON_NOT_DISPLAYED = 30
// Colors
export const PRIMARY_HEX_COLOR = '#42855B'
export const SECONDARY_HEX_COLOR = '#A0C2AD'
export const BACKGROUND_COLOR = 'rgba(255, 255, 255, 0.2)'
// Native
export const HARDWARE_BACK_PRESS_EVENT_NAME = 'hardwareBackPress'
// React Native
export const KEYBOARD_DID_SHOW_EVENT_NAME = 'keyboardDidShow'
export const KEYBOARD_DID_HIDE_EVENT_NAME = 'keyboardDidHide'
