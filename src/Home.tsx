import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import BottomContainer from './containers/BottomContainer'
import TopContainer from './containers/TopContainer'
import SearchContext from './contexts/SearchContext'
import { useBackHandler } from './hooks/useBackHandler'
import { useNotifyOnForeground } from './hooks/useNotifyOnForeground'
import { usePackageChange } from './hooks/usePackageChange'
import { AppDetails } from './models/app-details'
import { PackageChange } from './models/event'
import LauncherAppsModule from './native-modules/LauncherAppsModule'
import { appRemovedAction, setAppsList } from './slices/appsList'
import { setDisplayAllApps } from './slices/appState'
import { displayToast } from './utils/toast'

const initialLoadPackageName = 'INITIAL_LOAD'
const packageChangedInitialValue = {
  packageName: initialLoadPackageName,
  isRemoved: false,
}

const Home = () => {
  const dispatch = useDispatch()
  const [packageChanged, setPackageChanged] = useState<PackageChange>(packageChangedInitialValue) // after handling a change, the value needs to be reset to default value
  const { searchInputRef } = useContext(SearchContext)

  useEffect(() => {
    console.log('packageChanged changed, packageChanged: ', packageChanged)

    // TODO: Move all this to a saga?

    if (packageChanged.isRemoved && packageChanged.packageName !== initialLoadPackageName) {
      dispatch(appRemovedAction(packageChanged.packageName))
      // displayToast(`removed: ${packageChanged.packageName}`)
    } else {
      // displayToast(`added: ${packageChanged.packageName}`)
    }

    // dispatch(getAppsListAction())
  }, [packageChanged])

  useBackHandler(() => {
    dispatch(setDisplayAllApps(false))
    if (searchInputRef?.current?.isFocused()) searchInputRef?.current?.blur()

    // TODO: Read more about the return here: https://github.com/react-native-community/hooks#usebackhandler
    return true
  })

  usePackageChange((packageChange: PackageChange) => setPackageChanged(packageChange))
  // usePackageChange((packageChange: PackageChange) => {
  //   // console.log('usePackageChange: ', packageChange);

  //   setPackageChanged(packageChange)
  // })

  // useNotifyOnForeground(() => dispatch(revalidateAppsLists()))
  useNotifyOnForeground(() => {
    displayToast('On foreground')
    LauncherAppsModule.getApplicationsV3()
    // LauncherAppsModule.getApplications()
    //   .then((applications: string) => {
    //     const apps = JSON.parse(applications) as AppDetails[]
    //     dispatch(setAppsList(apps))
    //   })
    //   .catch(e => console.error('e: ', e))
  })

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
