// React
import React, { useContext, useEffect, useState } from 'react'
// React Native
import { Image, Pressable, StyleSheet, View } from 'react-native'
// Components
import HighlightText from './HighlightText'
// Redux
import { useDispatch } from 'react-redux'
// Slices
import { addRecentApp } from '../slices/recentApps'
import { resetAppsSearchState } from '../slices/appsSearch'
// Utils
import { launchApp } from '../utils/appsModule'
// Native modules
import AppsModule from '../native-modules/AppsModule'
// Contexts
import SearchContext, { SearchContextType } from '../contexts/SearchContext'
import GlobalContext, { GlobalContextType } from '../contexts/GlobalContext'
// Models
import { RenderedIn } from '../models/rendered-in'
import { AppItemProps as Props } from '../models/props'

const AppItem = ({ appDetails, renderedIn, appIcon }: Props) => {
  const dispatch = useDispatch()
  const [icon, setIcon] = useState<string | undefined>(undefined)
  const { hideAllApps, setAppItemMenuDetails, displayAppItemMenuBottomSheet } =
    useContext<GlobalContextType>(GlobalContext)
  const { triggerAppLaunchedProcedure } = useContext<SearchContextType>(SearchContext)

  const handleOnAppPress = () => {
    launchApp(appDetails.name)
    hideAllApps()
    triggerAppLaunchedProcedure()
    dispatch(resetAppsSearchState())

    if (icon && renderedIn === RenderedIn.FILTERED_APPS) dispatch(addRecentApp({ ...appDetails, icon }))
  }

  const handleLongPress = () => {
    setAppItemMenuDetails({ ...appDetails, icon: icon })
    displayAppItemMenuBottomSheet()
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
            backgroundColor: pressed ? 'rgba(255, 255, 255, .25)' : 'transparent',
          },
        ]}
        onPress={handleOnAppPress}
        onLongPress={handleLongPress}>
        <Image resizeMode={'contain'} style={styles.appIcon} source={{ uri: `data:image/png;base64,${icon}` }} />
        <HighlightText text={appDetails.label} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default AppItem
