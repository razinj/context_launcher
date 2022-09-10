// React
import React from 'react'
// React Native
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
// Redux
import { useSelector } from 'react-redux'
import { selectRecentAppsMemoized } from '../slices/recentApps'
// Components
import AppItem from './AppItem'
// Models
import { RenderedIn } from '../models/rendered-in'
import { RecentAppDetails } from '../models/recent-app'
import { BACKGROUND_COLOR } from '../constants'

const RecentApps = () => {
  const apps = useSelector(selectRecentAppsMemoized)

  const renderAppItem: ListRenderItem<RecentAppDetails> = ({ item }: ListRenderItemInfo<RecentAppDetails>) => (
    <AppItem appDetails={item} appIcon={item.icon} renderedIn={RenderedIn.RECENT_APPS} />
  )

  if (apps.length === 0) {
    return (
      <View style={[styles.wrapper, styles.noAppsWrapper]}>
        <Text style={styles.noAppsWrapperText}>No recent apps yet</Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        inverted
        data={apps}
        renderItem={renderAppItem}
        keyboardShouldPersistTaps={'handled'}
        keyExtractor={appDetails => appDetails.name}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 310,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: BACKGROUND_COLOR,
  },
  noAppsWrapper: {
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAppsWrapperText: {
    color: '#fff',
  },
})

export default RecentApps
