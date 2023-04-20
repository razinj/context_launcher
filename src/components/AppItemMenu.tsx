import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton, Modal, Portal, ToggleButton } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import {
  BOTTOM_CONTAINER_HEIGHT_WITH_PADDINGS,
  DISABLED_COLOR,
  NEUTRAL_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../constants'
import { resetAppsSearchState, selectDisplayAppMenu, selectMenuAppDetails, setDisplayAppMenu } from '../slices/appState'
import {
  addFavoriteApp,
  removeFavoriteApp,
  selectFavoriteAppsCountMemoized,
  selectFavoriteAppsMemoized,
} from '../slices/favoriteApps'
import {
  addPinnedApp,
  removePinnedApp,
  selectPinnedAppsMemoized,
  selectTemporaryPinnedAppsMemoized,
} from '../slices/pinnedApps'
import {
  selectDisplayFavoriteAppsMemoized,
  selectDisplayPinnedAppsMemoized,
  selectDisplayTemporaryPinnedAppsMemoized,
} from '../slices/preferences'
import { getAppIndex } from '../utils/apps'
import { requestAppUninstall, showAppDetails } from '../utils/apps-module'
import AppIcon from './shared/AppIcon'
import CustomIcon from './shared/CustomIcon'

const AppItemMenu = () => {
  const dispatch = useDispatch()
  const [isFavoriteApp, setIsFavoriteApp] = useState(false)
  const [isPinnedApp, setIsPinnedApp] = useState(false)
  const [isTemporarilyPinnedApp, setIsTemporarilyPinnedApp] = useState(false)
  const favoriteApps = useSelector(selectFavoriteAppsMemoized)
  const pinnedApps = useSelector(selectPinnedAppsMemoized)
  const temporaryPinnedApps = useSelector(selectTemporaryPinnedAppsMemoized)
  const favoriteAppsCount = useSelector(selectFavoriteAppsCountMemoized)
  const displayFavoriteAppsValue = useSelector(selectDisplayFavoriteAppsMemoized)
  const displayPinnedAppsValue = useSelector(selectDisplayPinnedAppsMemoized)
  const displayTemporaryPinnedApps = useSelector(selectDisplayTemporaryPinnedAppsMemoized)

  const appDetails = useSelector(selectMenuAppDetails)
  const displayAppMenu = useSelector(selectDisplayAppMenu)

  useEffect(() => {
    if (!appDetails) return

    setIsPinnedApp(getAppIndex(pinnedApps, appDetails.packageName) !== -1)
    setIsFavoriteApp(getAppIndex(favoriteApps, appDetails.packageName) !== -1)
    setIsTemporarilyPinnedApp(getAppIndex(temporaryPinnedApps, appDetails.packageName) !== -1)
  }, [appDetails, favoriteApps, pinnedApps, temporaryPinnedApps])

  if (!appDetails) return null

  const openAppInfo = () => {
    dispatch(resetAppsSearchState())
    showAppDetails(appDetails.packageName)
    dismissMenu()
  }

  const uninstallApp = () => {
    dispatch(resetAppsSearchState())
    requestAppUninstall(appDetails.packageName)
    dismissMenu()
  }

  const toggleFavoriteApp = () => {
    if (isFavoriteApp) dispatch(removeFavoriteApp(appDetails.packageName))
    else dispatch(addFavoriteApp(appDetails))
  }

  const togglePinnedApp = () => {
    if (isPinnedApp) {
      dispatch(removePinnedApp({ app: appDetails, isPermanent: true }))
    } else {
      dispatch(addPinnedApp({ app: appDetails, isPermanent: true }))
    }
  }

  const toggleTemporarilyPinnedApp = () => {
    if (isTemporarilyPinnedApp) {
      dispatch(removePinnedApp({ app: appDetails, isPermanent: false }))
    } else {
      dispatch(addPinnedApp({ app: appDetails, isPermanent: false }))
    }
  }

  const getToggleButtonIcon = (iconName: string, isActive: boolean, isDisabled: boolean) => {
    if (isDisabled) return <CustomIcon name={iconName} color={DISABLED_COLOR} size={30} />
    return <CustomIcon name={iconName} color={isActive ? PRIMARY_COLOR : NEUTRAL_COLOR} size={30} />
  }

  const getToggleButtonStatus = (isChecked: boolean) => (isChecked ? 'checked' : 'unchecked')

  const getTextOpacityStyle = (isDisabled: boolean) => ({ opacity: isDisabled ? 0.5 : 1 })

  const isPinButtonDisabled = !displayPinnedAppsValue
  const isTemporaryPinButtonDisabled = !displayTemporaryPinnedApps
  const isFavoriteButtonDisabled = !displayFavoriteAppsValue || (!isFavoriteApp && favoriteAppsCount === 5)

  const dismissMenu = () => {
    dispatch(setDisplayAppMenu(false))
  }

  return (
    <Portal>
      <Modal contentContainerStyle={styles.contentContainerStyle} visible={displayAppMenu} onDismiss={dismissMenu}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerIconAndTitleWrapper}>
            <AppIcon style={styles.appIcon} icon={appDetails.icon} />
            <Text style={styles.headerTitle}>{appDetails.name}</Text>
          </View>
          <IconButton
            size={30}
            icon='close'
            iconColor={NEUTRAL_COLOR}
            style={styles.dismissIcon}
            onPress={dismissMenu}
          />
        </View>

        <View style={styles.buttonsWrapper}>
          <View style={styles.toggleButtonWrapper}>
            <ToggleButton
              style={styles.toggleButton}
              onPress={toggleFavoriteApp}
              icon={() => getToggleButtonIcon('star', isFavoriteApp, isFavoriteButtonDisabled)}
              status={getToggleButtonStatus(isFavoriteApp)}
              disabled={isFavoriteButtonDisabled}
            />
            <Text style={[styles.buttonText, getTextOpacityStyle(isFavoriteButtonDisabled)]}>Favorite</Text>
          </View>

          <View style={styles.toggleButtonWrapper}>
            <ToggleButton
              style={styles.toggleButton}
              onPress={togglePinnedApp}
              icon={() => getToggleButtonIcon('pin', isPinnedApp, isPinButtonDisabled)}
              status={getToggleButtonStatus(isPinnedApp)}
              disabled={isPinButtonDisabled}
            />
            <Text style={[styles.buttonText, getTextOpacityStyle(isPinButtonDisabled)]}>Pin</Text>
          </View>

          <View style={styles.toggleButtonWrapper}>
            <ToggleButton
              style={styles.toggleButton}
              onPress={toggleTemporarilyPinnedApp}
              icon={() => getToggleButtonIcon('timer', isTemporarilyPinnedApp, isTemporaryPinButtonDisabled)}
              status={getToggleButtonStatus(isTemporarilyPinnedApp)}
              disabled={isTemporaryPinButtonDisabled}
            />
            <Text style={[styles.buttonText, getTextOpacityStyle(isTemporaryPinButtonDisabled)]}>Temp. Pin</Text>
          </View>

          <View style={styles.iconButtonWrapper}>
            <IconButton
              icon='information-outline'
              iconColor={NEUTRAL_COLOR}
              size={30}
              style={styles.iconButton}
              onPress={openAppInfo}
            />
            <Text style={styles.buttonText}>Info</Text>
          </View>

          <View style={styles.iconButtonWrapper}>
            <IconButton
              icon='trash-can-outline'
              iconColor={NEUTRAL_COLOR}
              size={30}
              style={styles.iconButton}
              onPress={uninstallApp}
            />
            <Text style={styles.buttonText}>Uninstall</Text>
          </View>
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
  headerWrapper: {
    paddingBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerIconAndTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: NEUTRAL_COLOR,
  },
  appIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  dismissIcon: {
    margin: 0,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  toggleButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleButton: {
    backgroundColor: WHITE_COLOR,
  },
  iconButtonWrapper: {
    alignItems: 'center',
  },
  iconButton: {
    margin: 0,
    borderRadius: 5,
  },
  buttonText: {
    color: NEUTRAL_COLOR,
  },
})

export default AppItemMenu
