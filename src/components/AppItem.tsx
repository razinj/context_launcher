// React
import React, { useContext, useEffect, useState } from 'react'
// React Native
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
// Components
import HighlightText from './HighlightText'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// Slices
import { addRecentApp } from '../slices/recentApps'
import { resetAppsSearchState } from '../slices/appsSearch'
import { addFavoriteApp, removeFavoriteApp, selectFavoriteAppsMemoized } from '../slices/favoriteApps'
// Utils
import { launchApp, requestAppUninstall, showAppDetails } from '../utils/appsModule'
// Native modules
import AppsModule from '../native-modules/AppsModule'
// Contexts
import SearchContext, { SearchContextType } from '../contexts/SearchContext'
import GlobalContext, { GlobalContextType } from '../contexts/GlobalContext'
// Models
import { RenderedIn } from '../models/rendered-in'
import { FavoriteApp } from '../models/favorite-app'
import { AppItemProps as Props } from '../models/props'

const AppItem = ({ appDetails, renderedIn, appIcon }: Props) => {
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)
  const [icon, setIcon] = useState<string | undefined>(undefined)
  const { hideAllApps } = useContext<GlobalContextType>(GlobalContext)
  const { triggerAppLaunchedProcedure } = useContext<SearchContextType>(SearchContext)
  const favoriteApps = useSelector(selectFavoriteAppsMemoized)
  const [isFavoriteApp, setIsFavoriteApp] = useState(false)

  const handleOnAppPress = () => {
    launchApp(appDetails.name)
    hideAllApps()
    triggerAppLaunchedProcedure()
    dispatch(resetAppsSearchState())

    if (icon && renderedIn === RenderedIn.FILTERED_APPS) dispatch(addRecentApp({ ...appDetails, icon }))
  }

  const addToFavoriteApps = () => {
    setModalVisible(false)
    if (icon) dispatch(addFavoriteApp({ ...appDetails, icon }))
  }

  const removeFromFavoriteApps = () => {
    setModalVisible(false)
    if (icon) dispatch(removeFavoriteApp(appDetails.name))
  }

  const openAppInfo = () => {
    setModalVisible(false)
    dispatch(resetAppsSearchState())
    showAppDetails(appDetails.name)
  }

  const uninstallApp = () => {
    setModalVisible(false)
    dispatch(resetAppsSearchState())
    requestAppUninstall(appDetails.name)
  }

  const pressableDynamicStyles = (pressed: boolean) => [
    styles.modalRow,
    {
      backgroundColor: pressed ? 'rgba(255, 255, 255, .25)' : 'rgba(128, 128, 128, 1)',
    },
  ]

  const handleLongPress = () => {
    const appIndex = favoriteApps.findIndex((app: FavoriteApp) => app.appDetails.name === appDetails.name)
    setIsFavoriteApp(appIndex !== -1)
    setModalVisible(true)
  }

  useEffect(() => {
    if (renderedIn === RenderedIn.FILTERED_APPS || renderedIn === RenderedIn.ALL_APPS) {
      AppsModule.getApplicationIcon(appDetails.name, (nativeAppIcon: string) => setIcon(nativeAppIcon))
    } else if (renderedIn === RenderedIn.RECENT_APPS) setIcon(appIcon)
  }, [])

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.pressable,
          {
            backgroundColor: pressed ? 'rgba(255, 255, 255, .2)' : 'transparent',
          },
        ]}
        onPress={handleOnAppPress}
        onLongPress={handleLongPress}>
        <Image resizeMode={'contain'} style={styles.appIcon} source={{ uri: `data:image/png;base64,${icon}` }} />
        <HighlightText text={appDetails.label} />
      </Pressable>

      {/* App context menu */}
      <Modal
        transparent={true}
        animationType='fade'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalWrapper}>
          <View style={styles.modal}>
            <View style={[styles.modalAppInfoWrapper, styles.modalRow]}>
              <Image
                resizeMode={'contain'}
                style={[styles.appIcon, styles.modalAppInfoIcon]}
                source={{ uri: `data:image/png;base64,${icon}` }}
              />
              <Text style={styles.modalAppInfoText}>{appDetails.label}</Text>
            </View>
            {isFavoriteApp && (
              <Pressable style={({ pressed }) => pressableDynamicStyles(pressed)} onPress={removeFromFavoriteApps}>
                <Text>Remove from favourite</Text>
              </Pressable>
            )}
            {!isFavoriteApp && (
              <Pressable style={({ pressed }) => pressableDynamicStyles(pressed)} onPress={addToFavoriteApps}>
                <Text>Add to favourite</Text>
              </Pressable>
            )}
            <Pressable style={({ pressed }) => pressableDynamicStyles(pressed)} onPress={openAppInfo}>
              <Text>Open App Info</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [...pressableDynamicStyles(pressed), styles.modalLastRow]}
              onPress={uninstallApp}>
              <Text>Uninstall App</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  // Component styles
  pressable: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  appIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  // Modal styles
  modalWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 75,
  },
  modal: {
    minWidth: '50%',
    elevation: 2.5,
    borderRadius: 5,
    backgroundColor: '#808080',
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
  modalRow: {
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalLastRow: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
})

export default AppItem
