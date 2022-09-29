// React
import React, { useContext, useEffect, useMemo, useState } from 'react'
// React Native
import { Image, Pressable, StyleSheet, View } from 'react-native'
// Components
import HighlightText from './HighlightText'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { addRecentApp } from '../slices/recentApps'
import { resetAppsSearchState } from '../slices/appsSearch'
import { selectDisplayAppsIconsMemoized } from '../slices/preferences'
// Utils
import { launchApp } from '../utils/appsModule'
// Native modules
import AppsModule from '../native-modules/AppsModule'
// Contexts
import SearchContext from '../contexts/SearchContext'
import GlobalContext from '../contexts/GlobalContext'
// Analytics
import perf from '@react-native-firebase/perf'
// Models
import { RenderedIn } from '../models/rendered-in'
import { AppItemProps as Props } from '../models/props'

const AppItem = ({ appDetails, renderedIn, appIcon }: Props) => {
  const dispatch = useDispatch()
  const [icon, setIcon] = useState<string | undefined>(undefined)
  const { searchAppLaunchProcedure } = useContext(SearchContext)
  const { setAppItemMenuDetails, displayAppItemMenuBottomSheet, globalAppLaunchProcedure } = useContext(GlobalContext)
  const displayAppsIconsValue = useSelector(selectDisplayAppsIconsMemoized)

  const onPress = async () => {
    const trace = await perf().startTrace('app_press')
    trace.putAttribute('rendered_in', renderedIn.toLowerCase())

    // Launch app
    launchApp(appDetails.name)

    // Reset views and values
    globalAppLaunchProcedure()
    searchAppLaunchProcedure()
    dispatch(resetAppsSearchState())

    // Add app to recent apps list
    if (renderedIn === RenderedIn.FILTERED_APPS || renderedIn === RenderedIn.ALL_APPS) {
      dispatch(addRecentApp({ ...appDetails, icon }))
    }

    await trace.stop()
  }

  const displayAppsIcons = useMemo(
    () => displayAppsIconsValue || renderedIn === RenderedIn.FAVORITE_APPS,
    [displayAppsIconsValue, renderedIn]
  )

  const displayLabel = useMemo(() => renderedIn !== RenderedIn.FAVORITE_APPS, [renderedIn])

  const onLongPress = async () => {
    const trace = await perf().startTrace('app_long_press')
    trace.putAttribute('rendered_in', renderedIn)

    setAppItemMenuDetails({ ...appDetails, icon })
    displayAppItemMenuBottomSheet()

    await trace.stop()
  }

  const pressableStyles = ({ pressed }: { pressed: boolean }) => {
    return {
      ...styles.pressable,
      borderRadius: displayAppsIcons ? 10 : 5,
      backgroundColor: pressed ? 'rgba(255, 255, 255, .25)' : 'transparent',
    }
  }

  useEffect(() => {
    if (renderedIn === RenderedIn.RECENT_APPS || renderedIn === RenderedIn.FAVORITE_APPS) {
      setIcon(appIcon)
    } else if (renderedIn === RenderedIn.ALL_APPS || renderedIn === RenderedIn.FILTERED_APPS) {
      AppsModule.getApplicationIcon(appDetails.name, (nativeAppIcon: string) => setIcon(nativeAppIcon))
    }
  }, [])

  return (
    <View>
      <Pressable onPress={onPress} onLongPress={onLongPress} style={pressableStyles}>
        {displayAppsIcons && (
          <Image
            resizeMode={'contain'}
            source={{ uri: `data:image/png;base64,${icon}` }}
            style={[styles.icon, { marginRight: displayLabel ? 10 : 0 }]}
          />
        )}
        {displayLabel && <HighlightText text={appDetails.label} />}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  pressable: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    marginHorizontal: 5,
  },
  icon: {
    width: 50,
    height: 50,
  },
})

export default AppItem
