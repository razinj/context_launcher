import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { FavoriteApp } from '../models/favorite-app'
import { RenderedIn } from '../models/rendered-in'
import {
  noAppsViewStyle,
  sectionHeaderLabelStyle,
  sectionHeaderWrapperStyle,
  sectionWrapper,
  whiteTextColorStyle,
} from '../shared/styles'
import { selectFavoriteAppsMemoized } from '../slices/favoriteApps'
import AppItem from './AppItem'

const FavoriteApps = () => {
  const apps = useSelector(selectFavoriteAppsMemoized)

  const noAppsFound = useMemo(() => apps.length === 0, [apps])

  const favoriteApps = useMemo(
    () =>
      apps.map((app: FavoriteApp) => (
        <AppItem key={app.packageName} appDetails={app} renderedIn={RenderedIn.FAVORITE_APPS} />
      )),
    [apps]
  )

  return (
    <View style={sectionWrapper}>
      <View style={sectionHeaderWrapperStyle}>
        <Text style={sectionHeaderLabelStyle}>Favorite</Text>
      </View>
      <View style={[styles.appsViewWrapper, noAppsFound ? [noAppsViewStyle, { minHeight: 72 }] : undefined]}>
        {noAppsFound ? (
          <Text style={whiteTextColorStyle}>No favorite apps yet</Text>
        ) : (
          <View style={[styles.appsWrapper, apps.length === 5 ? { justifyContent: 'space-between' } : undefined]}>
            {favoriteApps}
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appsViewWrapper: {
    padding: 5,
  },
  appsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})

export default FavoriteApps
