import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import BottomContainer from './containers/BottomContainer'
import TopContainer from './containers/TopContainer'
import SearchContext from './contexts/SearchContext'
import { useBackHandler } from './hooks/useBackHandler'
import { usePackageChange } from './hooks/usePackageChange'
import { PackageChange } from './models/event'
import { appRemovedAction, getAppsListAction } from './slices/appsList'
import { setDisplayAllApps } from './slices/appState'

const initialLoadPackageName = 'INITIAL_LOAD'
const packageChangedInitialValue = {
  packageName: initialLoadPackageName,
  isRemoved: false,
}

const Home = () => {
  const dispatch = useDispatch()
  const [packageChanged, setPackageChanged] = useState<PackageChange>(packageChangedInitialValue)
  const { searchInputRef } = useContext(SearchContext)

  useEffect(() => {
    if (packageChanged.isRemoved && packageChanged.packageName !== initialLoadPackageName) {
      dispatch(appRemovedAction(packageChanged.packageName))
    }

    dispatch(getAppsListAction())
  }, [packageChanged])

  useBackHandler(() => {
    dispatch(setDisplayAllApps(false))
    if (searchInputRef?.current?.isFocused()) searchInputRef?.current?.blur()

    // TODO: Read more about the return here: https://github.com/react-native-community/hooks#usebackhandler
    return true
  })

  usePackageChange((packageChange: PackageChange) => setPackageChanged(packageChange))

  return (
    <View style={styles.wrapper}>
      <TopContainer />
      <BottomContainer />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 5,
    overflow: 'hidden',
    marginTop: StatusBar.currentHeight,
    justifyContent: 'flex-end',
  },
})

export default Home
