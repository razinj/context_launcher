// React
import React, { useContext } from 'react'
// React Native
import { StyleSheet, View } from 'react-native'
// Contexts
import GlobalContext from '../contexts/GlobalContext'
// Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SettingsIcon = () => {
  const { displaySettingsBottomSheet } = useContext(GlobalContext)

  return (
    <View style={styles.wrapper}>
      <Icon style={styles.icon} name='menu' size={35} color='#000' onPress={displaySettingsBottomSheet} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    margin: 5,
  },
})

export default SettingsIcon
