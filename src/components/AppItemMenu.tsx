// React
import React, { useContext, useEffect, useState } from 'react'
// React Native
import { View, Text, Pressable, StyleSheet, PressableAndroidRippleConfig, Image } from 'react-native'
// Components
import SettingsItemLabel from './Settings/shared/SettingsItemLabel'
import CustomIcon from './shared/CustomIcon'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { resetAppsSearchState } from '../slices/appsSearch'
import {
  selectDisplayFavoriteAppsMemoized,
  selectDisplayPinnedAppsMemoized,
  selectDisplayTemporaryPinnedAppsMemoized,
} from '../slices/preferences'
import {
  selectFavoriteAppsMemoized,
  addFavoriteApp,
  removeFavoriteApp,
  selectFavoriteAppsCountMemoized,
} from '../slices/favoriteApps'
import {
  updateOrRemovePinnedApp,
  selectTemporaryPinnedAppsMemoized,
  selectAllPinnedAppsMemoized,
  selectPinnedAppsMemoized,
} from '../slices/pinnedApps'
// Contexts
import GlobalContext from '../contexts/GlobalContext'
// Bottom sheet
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet'
// Utils
import { requestAppUninstall, showAppDetails } from '../utils/apps-module'
import { getPinnedAppByName } from '../utils/apps'
// Model
import { FavoriteApp } from '../models/favorite-app'
import { PinnedApp } from '../models/pinned-app'
import { AppDetailsWithIcon } from '../models/app-details'

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
  const [isPinnedApp, setIsPinnedApp] = useState(false)
  const [isTemporarilyPinnedApp, setIsTemporarilyPinnedApp] = useState(false)
  const favoriteApps = useSelector(selectFavoriteAppsMemoized)
  const allPinnedApps = useSelector(selectAllPinnedAppsMemoized)
  const pinnedApps = useSelector(selectPinnedAppsMemoized)
  const temporaryPinnedApps = useSelector(selectTemporaryPinnedAppsMemoized)
  const favoriteAppsCount = useSelector(selectFavoriteAppsCountMemoized)
  const displayFavoriteAppsValue = useSelector(selectDisplayFavoriteAppsMemoized)
  const displayPinnedAppsValue = useSelector(selectDisplayPinnedAppsMemoized)
  const displayTemporaryPinnedApps = useSelector(selectDisplayTemporaryPinnedAppsMemoized)
  const { appItemMenuBottomSheetRef, appItemMenuDetails } = useContext(GlobalContext)

  useEffect(() => {
    if (!appItemMenuDetails) return

    const appIndex = favoriteApps.findIndex(({ name }: FavoriteApp) => name === appItemMenuDetails.name)
    setIsFavoriteApp(appIndex !== -1)
  }, [appItemMenuDetails, favoriteApps])

  useEffect(() => {
    if (!appItemMenuDetails) return

    const appIndex = pinnedApps.findIndex(({ name }: PinnedApp) => name === appItemMenuDetails.name)
    setIsPinnedApp(appIndex !== -1)
  }, [appItemMenuDetails, pinnedApps])

  useEffect(() => {
    if (!appItemMenuDetails) return

    const appIndex = temporaryPinnedApps.findIndex(({ name }: PinnedApp) => name === appItemMenuDetails.name)
    setIsTemporarilyPinnedApp(appIndex !== -1)
  }, [appItemMenuDetails, temporaryPinnedApps])

  const addToFavoriteApps = () => {
    if (!appItemMenuDetails || !appItemMenuDetails.icon) return

    dispatch(addFavoriteApp({ ...appItemMenuDetails, icon: appItemMenuDetails.icon }))
    closeMenu()
  }

  const removeFromFavoriteApps = () => {
    if (!appItemMenuDetails?.icon) return

    dispatch(removeFavoriteApp(appItemMenuDetails.name))
    closeMenu()
  }

  const updatePinnedApp = (isPermanent: boolean) => {
    if (!appItemMenuDetails || !appItemMenuDetails.icon) return

    dispatch(
      updateOrRemovePinnedApp({
        ...getPinnedAppByName(allPinnedApps, appItemMenuDetails as AppDetailsWithIcon),
        isPermanent,
      })
    )
    closeMenu()
  }

  const updateTemporaryPinnedApp = (isTemporary: boolean) => {
    if (!appItemMenuDetails || !appItemMenuDetails.icon) return

    dispatch(
      updateOrRemovePinnedApp({
        ...getPinnedAppByName(allPinnedApps, appItemMenuDetails as AppDetailsWithIcon),
        isTemporary,
      })
    )
    closeMenu()
  }

  const openAppInfo = () => {
    if (!appItemMenuDetails) return

    dispatch(resetAppsSearchState())
    showAppDetails(appItemMenuDetails.name)
    closeMenu()
  }

  const uninstallApp = () => {
    if (!appItemMenuDetails) return

    dispatch(resetAppsSearchState())
    requestAppUninstall(appItemMenuDetails.name)
    closeMenu()
  }

  const closeMenu = () => {
    appItemMenuBottomSheetRef?.current?.dismiss()
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
        snapPoints={[300]}
        style={styles.bottomSheetModal}
        bottomInset={58}
        detached={true}>
        {/* Wrapper */}
        <View style={styles.settingsWrapper}>
          {/* Header wrapper */}
          <View style={styles.headerWrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                resizeMode={'contain'}
                style={styles.appIcon}
                source={{ uri: `data:image/png;base64,${appItemMenuDetails?.icon}` }}
              />
              <Text style={styles.headerTitle}>{appItemMenuDetails?.label}</Text>
            </View>
            <Pressable onPress={closeMenu} android_disableSound={true} android_ripple={appInfoIconRippleConfig}>
              <CustomIcon name='close' size={34} color='#808080' />
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
              onPress={isPinnedApp ? () => updatePinnedApp(false) : () => updatePinnedApp(true)}
              style={({ pressed }: { pressed: boolean }) => [
                pressableStyles({ pressed }),
                { opacity: !displayPinnedAppsValue ? 0.5 : 1 },
              ]}
              disabled={!displayPinnedAppsValue}
              android_disableSound={true}
              android_ripple={settingItemButtonRippleConfig}>
              <SettingsItemLabel title={isPinnedApp ? 'Unpin app' : 'Pin app'} />
            </Pressable>
          </View>

          <View style={styles.itemContainer}>
            <Pressable
              onPress={
                isTemporarilyPinnedApp ? () => updateTemporaryPinnedApp(false) : () => updateTemporaryPinnedApp(true)
              }
              style={({ pressed }: { pressed: boolean }) => [
                pressableStyles({ pressed }),
                { opacity: !displayTemporaryPinnedApps ? 0.5 : 1 },
              ]}
              disabled={!displayTemporaryPinnedApps}
              android_disableSound={true}
              android_ripple={settingItemButtonRippleConfig}>
              <SettingsItemLabel title={isTemporarilyPinnedApp ? 'Unpin temporarily app' : 'Pin temporarily app'} />
            </Pressable>
          </View>

          <View style={styles.itemContainer}>
            <Pressable
              onPress={openAppInfo}
              style={pressableStyles}
              android_disableSound={true}
              android_ripple={settingItemButtonRippleConfig}>
              <SettingsItemLabel title='App Info' />
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
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
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
  },
  bottomSheetModal: {
    marginHorizontal: 5,
  },
  appIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
})

export default AppItemMenu
