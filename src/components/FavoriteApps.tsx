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
import { singleRowAppsViewStyle, whiteTextColorStyle } from '../shared/styles'
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

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerLabel}>Favorite</Text>
      </View>
      {apps.length > 0 ? (
        <View style={styles.horizontalAppsWrapper}>{favoriteApps}</View>
      ) : (
        <View style={singleRowAppsViewStyle}>
          <Text style={whiteTextColorStyle}>No favorite apps yet</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    backgroundColor: BACKGROUND_COLOR,
  },
  headerLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
  },
  headerWrapper: {
    paddingVertical: 2.5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
  },
  horizontalAppsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
  },
})

export default FavoriteApps
