// React
import React, { useContext } from 'react'
// React Native
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { resetAppsSearchState } from '../slices/appsSearch'
import { selectFavoriteAppsMemoized } from '../slices/favoriteApps'
// Contexts
import SearchContext, { SearchContextType } from '../contexts/SearchContext'
// Utils
import { launchApp } from '../utils/appsModule'
// Models
import { AppDetails } from '../models/app-details'
import { FavoriteApp } from '../models/favorite-app'
import { BACKGROUND_COLOR } from '../constants'

const FavoriteApps = () => {
  const dispatch = useDispatch()
  const apps = useSelector(selectFavoriteAppsMemoized)
  const { triggerAppLaunchedProcedure } = useContext<SearchContextType>(SearchContext)

  const handleAppPress = (app: AppDetails) => {
    launchApp(app.name)
    triggerAppLaunchedProcedure()
    dispatch(resetAppsSearchState())
  }

  if (apps.length === 0) {
    return (
      <View style={[styles.wrapper, styles.noAppsWrapper]}>
        <Text style={styles.noAppsWrapperText}>No favorite apps selected yet</Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      {apps.map((app: FavoriteApp) => (
        <Pressable
          key={app.appDetails.name}
          style={[styles.wrapper, styles.pressable]}
          onPress={() => handleAppPress(app.appDetails)}>
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={{ uri: `data:image/png;base64,${app.appDetails.icon}` }}
          />
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 60,
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
  pressable: {
    backgroundColor: 'transparent',
  },
  image: {
    width: 50,
    height: 50,
  },
})

export default FavoriteApps
