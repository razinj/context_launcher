// React
import React, { FC, useContext } from 'react'
// React Native
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// Slices
import { resetAppsSearchState } from '../slices/appsSearch'
import { selectFavoriteAppsMemoized } from '../slices/favoriteApps'
// Utils
import { launchApp } from '../utils/appsModule'
// Contexts
import SearchContext, { SearchContextType } from '../contexts/SearchContext'
// Models
import { AppDetails } from '../models/app-details'
import { FavoriteApp } from '../models/favorite-app'

const FavoriteApps: FC = () => {
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
    backgroundColor: 'rgba(255, 255, 255, .25)',
  },
  noAppsWrapper: {
    alignItems: 'center',
    paddingVertical: 0,
  },
  noAppsWrapperText: {
    color: 'rgba(255, 255, 255, .7)',
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
