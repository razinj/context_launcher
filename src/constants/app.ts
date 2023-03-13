// Modules
import AppsModule from '../native-modules/AppsModule'

// Constant values
export const {
  packageName: CONTEXT_LAUNCHER_APP_ID,
  appVersion: CONTEXT_LAUNCHER_APP_VERSION,
  buildNumber: CONTEXT_LAUNCHER_APP_BUILD_NUMBER,
} = AppsModule.getConstants()
export const APP_ITEM_HEIGHT_ICON_DISPLAYED = 60
// Colors
export const WHITE_COLOR = '#FFFFFF'
export const PRIMARY_COLOR = '#42855B'
export const SECONDARY_COLOR = '#A0C2AD'
export const BACKGROUND_COLOR = 'rgba(255, 255, 255, 0.2)'
// Native
export const HARDWARE_BACK_PRESS_EVENT_NAME = 'hardwareBackPress'
// React Native
export const KEYBOARD_DID_SHOW_EVENT_NAME = 'keyboardDidShow'
export const KEYBOARD_DID_HIDE_EVENT_NAME = 'keyboardDidHide'
