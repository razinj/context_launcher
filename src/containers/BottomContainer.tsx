import React, { useMemo } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useSelector } from 'react-redux'
import AllAppsIcon from '../components/AllAppsIcon'
import Search from '../components/Search'
import SettingsIcon from '../components/Settings/SettingsIcon'
import { SECONDARY_COLOR, WHITE_COLOR } from '../constants'
import { selectDisplayAllApps } from '../slices/appState'

const BottomContainer = () => {
  const displayAllApps = useSelector(selectDisplayAllApps)

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
    alignItems: 'center',
  },
})

export default BottomContainer
