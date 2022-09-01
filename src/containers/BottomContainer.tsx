// React
import React from 'react'
// React Native
import { StyleSheet, View } from 'react-native'
// Components
import Search from '../components/Search'
import AllAppsIcon from '../components/AllAppsIcon'
import SettingsIcon from '../components/SettingsIcon'

const BottomContainer = () => {
  return (
    <View style={styles.wrapper}>
      <AllAppsIcon />
      <Search />
      <SettingsIcon />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
})

export default BottomContainer
