// React Native
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
// Components
import AppItem from './AppItem'
// Redux
import { useSelector } from 'react-redux'
import { selectTemporaryPinnedAppsMemoized } from '../slices/pinnedApps'
// Constants
import { APP_ITEM_HEIGHT_ICON_DISPLAYED, BACKGROUND_COLOR } from '../constants'
import { singleRowAppsViewStyle, whiteTextColorStyle } from '../shared/styles'
// Models
import { RenderedIn } from '../models/rendered-in'
import { PinnedApp } from '../models/pinned-app'
import { AppDetails } from '../models/app-details'

const keyExtractor = ({ name }: AppDetails) => name
const getItemLayout = (_data: unknown, index: number) => ({
  length: APP_ITEM_HEIGHT_ICON_DISPLAYED,
  offset: APP_ITEM_HEIGHT_ICON_DISPLAYED * index,
  index,
})

const TemporaryPinnedApps = () => {
  const apps = useSelector(selectTemporaryPinnedAppsMemoized)

  const renderItem: ListRenderItem<PinnedApp> = ({ item }: ListRenderItemInfo<PinnedApp>) => (
    <AppItem key={item.name} appDetails={item} appIcon={item.icon} renderedIn={RenderedIn.PINNED_APPS} />
  )

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerLabel}>Temporarliy Pinned</Text>
      </View>
      {apps.length > 0 ? (
        <View style={styles.verticalAppsWrapper}>
          <FlatList
            data={apps}
            horizontal={true}
            renderItem={renderItem}
            initialNumToRender={6}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={singleRowAppsViewStyle}>
          <Text style={whiteTextColorStyle}>No temporarliy pinned apps yet</Text>
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
  verticalAppsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
  },
})

export default TemporaryPinnedApps
