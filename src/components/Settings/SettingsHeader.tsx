// React
import React, { useContext } from 'react'
// React Native
import { View, Text, Pressable, StyleSheet, PressableAndroidRippleConfig } from 'react-native'
// Components
import CustomIcon from '../shared/CustomIcon'
// Contexts
import GlobalContext from '../../contexts/GlobalContext'
// Utils
import { showAppDetails } from '../../utils/apps-module'
// Constants
import {
  CONTEXT_LAUNCHER_APP_VERSION,
  CONTEXT_LAUNCHER_APP_BUILD_NUMBER,
  CONTEXT_LAUNCHER_APP_ID,
} from '../../constants'

const appInfoIconRippleConfig: PressableAndroidRippleConfig = {
  borderless: true,
  foreground: true,
  color: '#e5e5e5',
  radius: 18,
}

const SettingsHeader = () => {
  const { settingsBottomSheetRef } = useContext(GlobalContext)

  const onAppInfoClick = () => {
    showAppDetails(CONTEXT_LAUNCHER_APP_ID)
    settingsBottomSheetRef?.current?.dismiss()
  }

  return (
    <View style={styles.wrapper} testID='settings-bottom-sheet-header-wrapper'>
      <Text style={styles.title}>
        Context Settings
        <Text style={styles.appInfoText}>
          &nbsp;&nbsp;v{CONTEXT_LAUNCHER_APP_VERSION} ({CONTEXT_LAUNCHER_APP_BUILD_NUMBER})
        </Text>
      </Text>
      <Pressable
        onPress={onAppInfoClick}
        android_disableSound={true}
        android_ripple={appInfoIconRippleConfig}
        testID='settings-bottom-sheet-header-app-info-button'>
        <CustomIcon name='information-outline' size={34} color='#808080' />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: '#808080',
    fontWeight: '400',
  },
  appInfoText: {
    color: '#ccc',
    fontSize: 12,
  },
})

export default SettingsHeader
