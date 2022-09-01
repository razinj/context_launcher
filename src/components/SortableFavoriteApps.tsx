// React
import React, { useContext } from 'react'
// React Native
import { Pressable, Image, StyleSheet, View, Animated, Easing, Text } from 'react-native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { selectFavoriteAppsMemoized, setFavoriteApps } from '../slices/favoriteApps'
// Contexts
import GlobalContext from '../contexts/GlobalContext'
// DraggableFlatList
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'
// Models
import { FavoriteApp } from '../models/favorite-app'

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const SortableFavoriteApps = () => {
  const dispatch = useDispatch()
  const apps = useSelector(selectFavoriteAppsMemoized)
  const { toggleSortableFavoriteApps } = useContext(GlobalContext)

  const renderItem = ({ item, drag, isActive }: RenderItemParams<FavoriteApp>) => {
    const animatedValueX = new Animated.Value(0)

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValueX, {
          toValue: getRandomInt(0, 3),
          duration: 150,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValueX, {
          toValue: getRandomInt(-3, 0),
          duration: 300,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValueX, {
          toValue: getRandomInt(0, 3),
          duration: 150,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ])
    ).start()

    const animatedValueY = new Animated.Value(0)

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValueY, {
          toValue: getRandomInt(0, 3),
          duration: 150,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValueY, {
          toValue: getRandomInt(-3, 0),
          duration: 300,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValueY, {
          toValue: getRandomInt(0, 3),
          duration: 150,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ])
    ).start()

    return (
      <ScaleDecorator>
        <Animated.View
          style={{
            transform: [{ translateX: isActive ? 0 : animatedValueX }, { translateY: isActive ? 0 : animatedValueY }],
          }}>
          <Pressable
            key={item.appDetails.name}
            style={[styles.wrapper, styles.pressable]}
            onLongPress={drag}
            disabled={isActive}>
            <Image
              style={styles.image}
              resizeMode={'contain'}
              source={{ uri: `data:image/png;base64,${item.appDetails.icon}` }}
            />
          </Pressable>
        </Animated.View>
      </ScaleDecorator>
    )
  }

  return (
    <View style={styles.wrapper}>
      <DraggableFlatList
        data={apps}
        horizontal
        onDragEnd={({ data }: { data: FavoriteApp[] }) => {
          dispatch(setFavoriteApps(data))
          toggleSortableFavoriteApps()
        }}
        keyExtractor={item => item.appDetails.name}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
    paddingVertical: 2.5,
    backgroundColor: 'rgba(255, 255, 255, .25)',
  },
  pressable: {
    backgroundColor: 'transparent',
    marginHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
})

export default SortableFavoriteApps
