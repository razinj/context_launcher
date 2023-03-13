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
import { APP_ITEM_HEIGHT_ICON_DISPLAYED, BACKGROUND_COLOR } from '../constants'
import { singleRowAppsViewStyle, whiteTextColorStyle } from '../shared/styles'
// Models
import { RenderedIn } from '../models/rendered-in'
import { RecentAppDetails } from '../models/recent-app'

const keyExtractor = ({ name }: RecentAppDetails) => name
const getItemLayout = (_data: unknown, index: number) => ({
  length: APP_ITEM_HEIGHT_ICON_DISPLAYED,
  offset: APP_ITEM_HEIGHT_ICON_DISPLAYED * index,
  index,
})

const RecentApps = () => {
  const apps = useSelector(selectRecentAppsMemoized)

  const renderItem: ListRenderItem<RecentAppDetails> = ({ item }: ListRenderItemInfo<RecentAppDetails>) => (
    <AppItem
      pressableStyle={{ borderRadius: 0, paddingHorizontal: 7.5 }}
      appDetails={item}
      appIcon={item.icon}
      renderedIn={RenderedIn.RECENT_APPS}
    />
  )

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerLabel}>Recent</Text>
      </View>
      {apps.length > 0 ? (
        <View style={styles.verticalAppsWrapper}>
          <FlatList
            inverted
            data={apps}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            keyboardShouldPersistTaps={'handled'}
          />
        </View>
      ) : (
        <View style={singleRowAppsViewStyle}>
          <Text style={whiteTextColorStyle}>No recent apps yet</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    backgroundColor: BACKGROUND_COLOR,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  verticalAppsWrapper: {
    paddingVertical: 5,
  },
})

export default RecentApps
