import React, { useEffect, useState } from 'react'
import { Pressable, PressableAndroidRippleConfig, StyleSheet, Text, View } from 'react-native'
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { BACKGROUND_COLOR, WHITE_COLOR } from '../constants'
import { FavoriteApp } from '../models/favorite-app'
import { setDisplaySortableFavoriteApps } from '../slices/appState'
import { selectFavoriteAppsMemoized, setFavoriteApps } from '../slices/favoriteApps'
import { getListKey } from '../utils/apps'
import AppIcon from './shared/AppIcon'
import CustomIcon from './shared/CustomIcon'

const doneButtonRippleConfig: PressableAndroidRippleConfig = {
  borderless: true,
  foreground: false,
  color: '#ccc',
  radius: 10,
}

const SortableFavoriteApps = () => {
  const dispatch = useDispatch()
  const apps = useSelector(selectFavoriteAppsMemoized)
  const [sorted, setSorted] = useState(false)

  const rotateValue = useSharedValue(-5)

  useEffect(() => {
    rotateValue.value = withRepeat(withTiming(5), -1, true)

    return () => cancelAnimation(rotateValue)
  }, [])

  const animatedStyles = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotateValue.value}deg` }] }))

  const doneSorting = () => {
    dispatch(setDisplaySortableFavoriteApps(false))
  }

  const onDragEnd = async ({ data }: { data: FavoriteApp[] }) => {
    dispatch(setFavoriteApps(data))
    if (!sorted) setSorted(true)
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<FavoriteApp>) => {
    return (
      <ScaleDecorator>
        <Animated.View style={isActive ? undefined : animatedStyles}>
          <Pressable key={item.packageName} style={styles.pressable} onLongPress={drag} disabled={isActive}>
            <AppIcon style={styles.image} icon={item.icon} />
          </Pressable>
        </Animated.View>
      </ScaleDecorator>
    )
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoText}>Press and hold an app to start dragging</Text>
        <Pressable
          style={styles.doneButtonWrapper}
          onPress={doneSorting}
          android_disableSound={true}
          android_ripple={doneButtonRippleConfig}>
          <CustomIcon name={sorted ? 'check' : 'close'} size={18} color={WHITE_COLOR} />
        </Pressable>
      </View>
      <View style={styles.draggableListWrapper}>
        <DraggableFlatList
          horizontal
          data={apps}
          onDragEnd={onDragEnd}
          renderItem={renderItem}
          keyExtractor={getListKey}
          keyboardShouldPersistTaps={'handled'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderRadius: 5,
    paddingVertical: 2.5,
    backgroundColor: BACKGROUND_COLOR,
  },
  draggableListWrapper: {
    flex: 1,
  },
  pressable: {
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  image: {
    width: 50,
    height: 50,
  },
  infoTextWrapper: {
    width: '80%',
    margin: 2.5,
    padding: 2.5,
    position: 'relative',
    borderBottomColor: WHITE_COLOR,
    borderBottomWidth: 1,
  },
  infoText: {
    color: WHITE_COLOR,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowRadius: 2.5,
  },
  doneButtonWrapper: {
    top: 2.5,
    right: 0,
    padding: 2,
    borderRadius: 50,
    position: 'absolute',
  },
})

export default SortableFavoriteApps
