// React
import React, { useContext, useMemo } from 'react'
// React Native
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
// Components
import Search from '../components/Search'
import AllAppsIcon from '../components/AllAppsIcon'
import SettingsIcon from '../components/Settings/SettingsIcon'
// Contexts
import GlobalContext from '../contexts/GlobalContext'
// Constants
import { SECONDARY_COLOR, WHITE_COLOR } from '../constants'

const BottomContainer = () => {
  const { displayAllApps } = useContext(GlobalContext)

  const adaptiveStyle: StyleProp<ViewStyle> = useMemo(() => {
    return { backgroundColor: displayAllApps ? SECONDARY_COLOR : WHITE_COLOR }
  }, [displayAllApps])

  return (
    <View style={[styles.wrapper, adaptiveStyle]}>
      <AllAppsIcon />
      <Search />
      <SettingsIcon />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    flexDirection: 'row',
  },
})

export default BottomContainer
