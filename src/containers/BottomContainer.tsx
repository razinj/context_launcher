// React
import React, { useContext } from 'react'
// React Native
import { StyleSheet, View } from 'react-native'
// Components
import Search from '../components/Search'
import AllAppsIcon from '../components/AllAppsIcon'
import SettingsIcon from '../components/Settings/SettingsIcon'
// Contexts
import GlobalContext from '../contexts/GlobalContext'
// Constants
import { SECONDARY_HEX_COLOR } from '../constants'

const BottomContainer = () => {
  const { displayAllApps } = useContext(GlobalContext)

  return (
    <View style={[styles.wrapper, { backgroundColor: displayAllApps ? SECONDARY_HEX_COLOR : '#fff' }]}>
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
  },
})

export default BottomContainer
