// React
import React, { useContext, useState } from 'react'
// React Native
import { Pressable, Image, StyleSheet, View, Animated, Easing, Text, PressableAndroidRippleConfig } from 'react-native'
// Components
import CustomIcon from './shared/CustomIcon'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { selectFavoriteAppsMemoized, setFavoriteApps } from '../slices/favoriteApps'
// Contexts
import GlobalContext from '../contexts/GlobalContext'
// DraggableFlatList
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'
// Constants
import { BACKGROUND_COLOR } from '../constants'
// Models
import { FavoriteApp } from '../models/favorite-app'

const doneButtonRippleConfig: PressableAndroidRippleConfig = {
  borderless: true,
  foreground: false,
  color: '#ccc',
  radius: 10,
}

const keyExtractor = ({ name }: FavoriteApp) => name

const SortableFavoriteApps = () => {
  const dispatch = useDispatch()
  const apps = useSelector(selectFavoriteAppsMemoized)
  const { toggleSortableFavoriteApps } = useContext(GlobalContext)
  const [sorted, setSorted] = useState(false)

  const animatedValueX = new Animated.Value(-1)

  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValueX, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValueX, {
        toValue: -1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ])
  ).start()

  const doneSorting = () => {
    toggleSortableFavoriteApps()
  }

  const onDragEnd = async ({ data }: { data: FavoriteApp[] }) => {
    dispatch(setFavoriteApps(data))
    if (!sorted) setSorted(true)
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<FavoriteApp>) => {
    return (
      <ScaleDecorator>
        <Animated.View style={{ transform: [{ translateX: isActive ? 0 : animatedValueX }] }}>
          <Pressable key={item.name} style={[styles.pressable]} onLongPress={drag} disabled={isActive}>
            <Image style={styles.image} resizeMode={'contain'} source={{ uri: `data:image/png;base64,${item.icon}` }} />
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
          <CustomIcon name={sorted ? 'check' : 'close'} size={18} color='#fff' />
        </Pressable>
      </View>
      <View style={styles.draggableListWrapper}>
        <DraggableFlatList
          horizontal
          data={apps}
          onDragEnd={onDragEnd}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
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
    borderRadius: 10,
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
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  infoText: {
    color: '#fff',
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
