import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectAppsListMemoized } from '../slices/appsList'
import AppItem from './AppItem'
import { RenderedIn } from '../models/rendered-in'
import { AppDetails } from '../models/app-details'
import { AlphabetList } from 'react-native-section-alphabet-list'

const AllApps: FC = () => {
  const apps = useSelector(selectAppsListMemoized)

  const renderAppItem: any = (itemPayload: { data: AppDetails }) => (
    <AppItem appDetails={itemPayload.data} renderedIn={RenderedIn.ALL_APPS} />
  )

  if (apps.length === 0) {
    return (
      <View style={[styles.wrapper, styles.noAppsWrapper]}>
        <Text style={styles.noAppsWrapperText}>No apps found</Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <AlphabetList
        stickySectionHeadersEnabled
        renderCustomItem={renderAppItem}
        showsVerticalScrollIndicator={false}
        data={apps.map((appDetails: AppDetails) => ({
          key: appDetails.name,
          value: appDetails.label,
          data: appDetails,
        }))}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, .25)',
  },
  noAppsWrapper: {
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAppsWrapperText: {
    color: 'rgba(255, 255, 255, .7)',
  },
})

export default AllApps
