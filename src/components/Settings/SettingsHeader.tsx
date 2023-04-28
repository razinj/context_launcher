import React from 'react'
import { Pressable, PressableAndroidRippleConfig, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { APP_BUILD_NUMBER, APP_ID, APP_VERSION } from '../../constants'
import { setDisplaySettings } from '../../slices/appState'
import { showAppDetails } from '../../utils/apps-module'
import CustomIcon from '../shared/CustomIcon'

const appInfoIconRippleConfig: PressableAndroidRippleConfig = {
  borderless: true,
  foreground: true,
  color: '#e5e5e5',
  radius: 18,
}

const SettingsHeader = () => {
  const dispatch = useDispatch()

  const onAppInfoClick = () => {
    showAppDetails(APP_ID)
    dispatch(setDisplaySettings(false))
  }

  return (
    <View style={styles.wrapper} testID='wrapper'>
      <Text style={styles.title}>
        Context Settings
        <Text style={styles.appInfoText}>
          &nbsp;&nbsp;v{APP_VERSION} ({APP_BUILD_NUMBER})
        </Text>
      </Text>
      <Pressable
        onPress={onAppInfoClick}
        android_disableSound={true}
        android_ripple={appInfoIconRippleConfig}
        testID='app-info-button'>
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
