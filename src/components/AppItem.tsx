// React
import React, { useContext, useEffect, useMemo, useState } from 'react'
// React Native
import { Image, Pressable, StyleSheet, View, StyleProp, ViewStyle } from 'react-native'
// Components
import HighlightText from './HighlightText'
// Redux
import { useDispatch } from 'react-redux'
import { addRecentApp } from '../slices/recentApps'
import { resetAppsSearchState } from '../slices/appsSearch'
// Utils
import { launchApp } from '../utils/apps-module'
// Native modules
import AppsModule from '../native-modules/AppsModule'
// Contexts
import SearchContext from '../contexts/SearchContext'
import GlobalContext from '../contexts/GlobalContext'
// Models
import { RenderedIn } from '../models/rendered-in'
import { AppItemProps as Props } from '../models/props'

const AppItem = ({ appDetails, renderedIn, appIcon, wrapperStyle, pressableStyle }: Props) => {
  const dispatch = useDispatch()
  const [icon, setIcon] = useState<string | undefined>(undefined)
  const { searchAppLaunchProcedure, searchInputRef } = useContext(SearchContext)
  const { setAppItemMenuDetails, displayAppItemMenuBottomSheet, globalAppLaunchProcedure } = useContext(GlobalContext)

  const onPress = () => {
    // Reset views and values
    globalAppLaunchProcedure()
    searchAppLaunchProcedure()
    searchInputRef?.current?.clear()
    dispatch(resetAppsSearchState())
    // Add app to recent apps list
    if (renderedIn === RenderedIn.FILTERED_APPS || renderedIn === RenderedIn.ALL_APPS) {
      dispatch(addRecentApp({ ...appDetails, icon }))
    }
    // Launch app
    launchApp(appDetails.name)
  }

  const displayLabel = useMemo(
    () => renderedIn !== RenderedIn.FAVORITE_APPS && renderedIn !== RenderedIn.PINNED_APPS,
    [renderedIn]
  )

  const onLongPress = () => {
    setAppItemMenuDetails({ ...appDetails, icon })
    displayAppItemMenuBottomSheet()
  }

  const pressableStyles = ({ pressed }: { pressed: boolean }): StyleProp<ViewStyle> => {
    return [{ backgroundColor: pressed ? 'rgba(255, 255, 255, .25)' : 'transparent' }, styles.pressable, pressableStyle]
  }

  useEffect(() => {
    if (
      renderedIn === RenderedIn.RECENT_APPS ||
      renderedIn === RenderedIn.FAVORITE_APPS ||
      renderedIn === RenderedIn.PINNED_APPS
    ) {
      setIcon(appIcon)
    } else if (renderedIn === RenderedIn.ALL_APPS || renderedIn === RenderedIn.FILTERED_APPS) {
      AppsModule.getApplicationIcon(appDetails.name, (nativeAppIcon: string) => setIcon(nativeAppIcon))
    }
  }, [])

  return (
    <View style={wrapperStyle}>
      <Pressable onPress={onPress} onLongPress={onLongPress} style={pressableStyles}>
        <Image
          resizeMode={'contain'}
          source={{ uri: `data:image/png;base64,${icon}` }}
          style={[styles.icon, { marginRight: displayLabel ? 10 : 0 }]}
        />
        {displayLabel && <HighlightText text={appDetails.label} />}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  pressable: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
  },
})

export default AppItem
