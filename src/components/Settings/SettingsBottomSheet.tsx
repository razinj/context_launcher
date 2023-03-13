// React
import React, { useContext } from 'react'
// React Native
import { StyleSheet, View } from 'react-native'
// Components
import SettingsHeader from './SettingsHeader'
import ToggleSettings from './shared/ToggleSettings'
import RecentAppsSettings from './sections/RecentAppsSettings'
import PinnedAppsSettings from './sections/PinnedAppsSettings'
import FavoriteAppsSettings from './sections/FavoriteAppsSettings'
import AdvancedSettings from './sections/AdvancedSettings'
// Contexts
import GlobalContext from '../../contexts/GlobalContext'
// BottomSheet
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const SettingsBottomSheet = () => {
  const { settingsBottomSheetRef } = useContext(GlobalContext)

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={settingsBottomSheetRef}
        snapPoints={['25%', '50%', '75%', '95%']}
        style={styles.bottomSheetModal}>
        <View style={styles.settingsWrapper} testID='settings-bottom-sheet-wrapper'>
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
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  bottomSheetModal: {
    marginHorizontal: 5,
  },
  settingsWrapper: {
    paddingHorizontal: 10,
  },
})

export default SettingsBottomSheet
