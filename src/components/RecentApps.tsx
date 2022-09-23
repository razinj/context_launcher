// React
import React from 'react'
// React Native
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
// Redux
import { useSelector } from 'react-redux'
import { selectRecentAppsMemoized } from '../slices/recentApps'
// Components
import AppItem from './AppItem'
// Constants
import { BACKGROUND_COLOR } from '../constants'
// Models
import { RenderedIn } from '../models/rendered-in'
import { RecentAppDetails } from '../models/recent-app'

const keyExtractor = ({ name }: RecentAppDetails) => name

const RecentApps = () => {
  const apps = useSelector(selectRecentAppsMemoized)

  if (apps.length === 0) {
    return (
      <View style={[styles.wrapper, styles.noAppsWrapper]}>
        <Text style={styles.noAppsWrapperText}>No recent apps yet</Text>
      </View>
    )
  }

  const renderItem: ListRenderItem<RecentAppDetails> = ({ item }: ListRenderItemInfo<RecentAppDetails>) => (
    <AppItem appDetails={item} appIcon={item.icon} renderedIn={RenderedIn.RECENT_APPS} />
  )

  return (
    <View style={styles.wrapper}>
      <FlatList
        inverted
        data={apps}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps={'handled'}
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
