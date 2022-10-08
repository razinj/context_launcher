// React
import React, { useContext, useEffect, useState } from 'react'
// React Native
import { View, Text, Pressable, StyleSheet, PressableAndroidRippleConfig, Image } from 'react-native'
// Components
import SettingsItemLabel from './Settings/SettingsItemLabel'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { resetAppsSearchState } from '../slices/appsSearch'
import { selectDisplayFavoriteAppsMemoized } from '../slices/preferences'
import {
  selectFavoriteAppsMemoized,
  addFavoriteApp,
  removeFavoriteApp,
  selectFavoriteAppsCountMemoized,
} from '../slices/favoriteApps'
// Contexts
import GlobalContext from '../contexts/GlobalContext'
// Bottom sheet
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet'
// Icon
import Icon from 'react-native-vector-icons/MaterialIcons'
// Utils
import { requestAppUninstall, showAppDetails } from '../utils/appsModule'
// Model
import { FavoriteApp } from '../models/favorite-app'

const appInfoIconRippleConfig: PressableAndroidRippleConfig = {
  borderless: true,
  foreground: true,
  color: '#e5e5e5',
  radius: 18,
}

const settingItemButtonRippleConfig: PressableAndroidRippleConfig = {
  borderless: false,
  foreground: true,
  color: '#e5e5e5',
}

const AppItemMenu = () => {
  const dispatch = useDispatch()
  const [isFavoriteApp, setIsFavoriteApp] = useState(false)
  const favoriteApps = useSelector(selectFavoriteAppsMemoized)
  const favoriteAppsCount = useSelector(selectFavoriteAppsCountMemoized)
  const displayFavoriteAppsValue = useSelector(selectDisplayFavoriteAppsMemoized)
  const { appItemMenuBottomSheetRef, appItemMenuDetails } = useContext(GlobalContext)

  useEffect(() => {
    if (!appItemMenuDetails) return

    const appIndex = favoriteApps.findIndex(({ name }: FavoriteApp) => name === appItemMenuDetails.name)
    setIsFavoriteApp(appIndex !== -1)
  }, [appItemMenuDetails, favoriteApps])

  const addToFavoriteApps = () => {
    if (!appItemMenuDetails || !appItemMenuDetails.icon) return

    dispatch(addFavoriteApp({ ...appItemMenuDetails, icon: appItemMenuDetails.icon }))
    appItemMenuBottomSheetRef?.current?.close()
  }

  const removeFromFavoriteApps = () => {
    if (!appItemMenuDetails?.icon) return

    dispatch(removeFavoriteApp(appItemMenuDetails.name))
    appItemMenuBottomSheetRef?.current?.close()
  }

  const openAppInfo = () => {
    if (!appItemMenuDetails) return

    dispatch(resetAppsSearchState())
    showAppDetails(appItemMenuDetails.name)
    appItemMenuBottomSheetRef?.current?.close()
  }

  const uninstallApp = () => {
    if (!appItemMenuDetails) return

    dispatch(resetAppsSearchState())
    requestAppUninstall(appItemMenuDetails.name)
    appItemMenuBottomSheetRef?.current?.close()
  }

  const closeMenu = () => {
    appItemMenuBottomSheetRef?.current?.close()
  }

  const pressableStyles = ({ pressed }: { pressed: boolean }) => {
    return {
      flex: 1,
      backgroundColor: pressed ? 'rgba(255, 255, 255, .25)' : 'transparent',
    }
  }

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={appItemMenuBottomSheetRef}
        snapPoints={[200]}
        // contentHeight={100}
        style={styles.bottomSheetModal}
        bottomInset={58}
        detached={true}>
        {/* Wrapper */}
        <View style={styles.settingsWrapper}>
          {/* Header wrapper */}
          <View style={styles.headerWrapper}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                resizeMode={'contain'}
                style={[styles.appIcon, styles.modalAppInfoIcon]}
                source={{ uri: `data:image/png;base64,${appItemMenuDetails?.icon}` }}
              />
              <Text style={styles.headerTitle}>{appItemMenuDetails?.label}</Text>
            </View>
            <Pressable onPress={closeMenu} android_disableSound={true} android_ripple={appInfoIconRippleConfig}>
              <Icon name='close' size={34} color='#808080' />
            </Pressable>
          </View>

          <View style={styles.itemContainer}>
            <Pressable
              onPress={isFavoriteApp ? removeFromFavoriteApps : addToFavoriteApps}
              style={({ pressed }: { pressed: boolean }) => [
                pressableStyles({ pressed }),
                { opacity: !displayFavoriteAppsValue || (!isFavoriteApp && favoriteAppsCount === 5) ? 0.5 : 1 },
              ]}
              disabled={!displayFavoriteAppsValue || (!isFavoriteApp && favoriteAppsCount === 5)}
              android_disableSound={true}
              android_ripple={settingItemButtonRippleConfig}>
              <SettingsItemLabel title={isFavoriteApp ? 'Remove from favourite' : 'Add to favourite'} />
            </Pressable>
          </View>

          <View style={styles.itemContainer}>
            <Pressable
              onPress={openAppInfo}
              style={pressableStyles}
              android_disableSound={true}
              android_ripple={settingItemButtonRippleConfig}>
              <SettingsItemLabel title='Open App Info' />
            </Pressable>
          </View>

          <View style={styles.itemContainer}>
            <Pressable
              onPress={uninstallApp}
              style={pressableStyles}
              android_disableSound={true}
              android_ripple={settingItemButtonRippleConfig}>
              <SettingsItemLabel title='Uninstall App' />
            </Pressable>
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  settingsWrapper: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  buttonItemPressable: {
    flex: 1,
  },
  headerWrapper: {
    paddingBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    color: '#808080',
    fontWeight: '400',
  },
  bottomSheetModal: {
    marginHorizontal: 5,
  },
  appIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  modalWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 75,
  },
  modalAppInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalAppInfoText: {
    fontWeight: '900',
  },
  modalAppInfoIcon: {
    width: 25,
    height: 25,
  },
})

export default AppItemMenu
