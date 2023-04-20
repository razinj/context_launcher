import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { BOTTOM_CONTAINER_HEIGHT_WITH_PADDINGS } from '../../constants'
import { selectDisplaySettings, setDisplaySettings } from '../../slices/appState'
import AdvancedSettings from './sections/AdvancedSettings'
import FavoriteAppsSettings from './sections/FavoriteAppsSettings'
import PinnedAppsSettings from './sections/PinnedAppsSettings'
import RecentAppsSettings from './sections/RecentAppsSettings'
import SettingsHeader from './SettingsHeader'
import ToggleSettings from './shared/ToggleSettings'

const Settings = () => {
  const dispatch = useDispatch()
  const displaySettings = useSelector(selectDisplaySettings)

  const closeSettings = () => {
    dispatch(setDisplaySettings(false))
  }

  return (
    <Portal>
      <Modal contentContainerStyle={styles.contentContainerStyle} visible={displaySettings} onDismiss={closeSettings}>
        <View testID='settings-wrapper'>
          <SettingsHeader />

          <ToggleSettings title={'Recent Apps'}>
            <RecentAppsSettings />
          </ToggleSettings>

          <ToggleSettings title={'Pinned Apps'}>
            <PinnedAppsSettings />
          </ToggleSettings>

          <ToggleSettings title={'Favorite Apps'}>
            <FavoriteAppsSettings />
          </ToggleSettings>

          <ToggleSettings title={'Advanced Settings'}>
            <AdvancedSettings />
          </ToggleSettings>
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    position: 'absolute',
    left: 5,
    right: 5,
    bottom: BOTTOM_CONTAINER_HEIGHT_WITH_PADDINGS,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
})

export default Settings
