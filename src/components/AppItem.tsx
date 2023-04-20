import React, { useContext } from 'react'
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { List } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { APP_ITEM_HEIGHT, PRESSABLE_RIPPLE_COLOR } from '../constants'
import SearchContext from '../contexts/SearchContext'
import { AppDetails } from '../models/app-details'
import { RenderedIn } from '../models/rendered-in'
import { appLaunch, setDisplayAppMenu, setMenuAppDetails } from '../slices/appState'
import { launchApp } from '../utils/apps-module'
import HighlightText from './HighlightText'
import AppIcon from './shared/AppIcon'

type Props = {
  appDetails: AppDetails
  renderedIn: RenderedIn
  listItemStyle?: StyleProp<ViewStyle>
}

const AppItem = ({ appDetails, renderedIn }: Props) => {
  const dispatch = useDispatch()
  const { searchAppLaunchProcedure } = useContext(SearchContext)

  const displayLabel = ![RenderedIn.PINNED_APPS, RenderedIn.FAVORITE_APPS].includes(renderedIn)

  const onPress = () => {
    launchApp(appDetails.packageName)

    // Reset app state
    searchAppLaunchProcedure()
    // Clean up state and launch app
    dispatch(appLaunch({ renderedIn, appDetails }))
  }

  const onLongPress = () => {
    dispatch(setMenuAppDetails(appDetails))
    dispatch(setDisplayAppMenu(true))
  }

  const getAppIconElement = () => <AppIcon style={styles.icon} icon={appDetails.icon} />
  const getAppTitle = () => <HighlightText text={appDetails.name} />

  if (displayLabel) {
    return (
      <List.Item
        style={styles.listItem}
        rippleColor={PRESSABLE_RIPPLE_COLOR}
        title={getAppTitle}
        left={getAppIconElement}
        onPress={onPress}
        onLongPress={onLongPress}
      />
    )
  }

  return (
    <View style={styles.pressableWrapper}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.pressable}
        android_ripple={{ borderless: true, color: PRESSABLE_RIPPLE_COLOR }}>
        {getAppIconElement()}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    paddingLeft: 10,
    paddingVertical: 0,
    height: APP_ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    padding: 5,
  },
  pressableWrapper: {
    borderRadius: 5,
    height: APP_ITEM_HEIGHT,
  },
  icon: {
    width: 50,
    height: 50,
  },
})

export default AppItem
