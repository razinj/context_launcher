// React
import React, { useMemo } from 'react'
// React Native
import { StyleSheet, Text, View } from 'react-native'
// Components
import AppItem from './AppItem'
// Redux
import { useSelector } from 'react-redux'
import { selectFavoriteAppsMemoized } from '../slices/favoriteApps'
// Constants
import { BACKGROUND_COLOR } from '../constants'
// Models
import { RenderedIn } from '../models/rendered-in'
import { FavoriteApp } from '../models/favorite-app'

const FavoriteApps = () => {
  const apps = useSelector(selectFavoriteAppsMemoized)

  const favoriteApps = useMemo(
    () =>
      apps.map((app: FavoriteApp) => (
        <AppItem key={app.name} appDetails={app} appIcon={app.icon} renderedIn={RenderedIn.FAVORITE_APPS} />
      )),
    [apps]
  )

  if (apps.length === 0) {
    return (
      <View style={[styles.wrapper, styles.noAppsWrapper]}>
        <Text style={styles.noAppsWrapperText}>No favorite apps set yet</Text>
      </View>
    )
  }

  return <View style={styles.wrapper}>{favoriteApps}</View>
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    minHeight: 65,
    borderRadius: 10,
    paddingVertical: 2.5,
    backgroundColor: BACKGROUND_COLOR,
  },
  noAppsWrapper: {
    alignItems: 'center',
    paddingVertical: 0,
  },
  noAppsWrapperText: {
    color: '#fff',
  },
})

export default FavoriteApps
