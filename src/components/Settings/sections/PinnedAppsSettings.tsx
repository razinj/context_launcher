// React
import React from 'react'
// React Native
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
// Components
import SettingsItemLabel from '../shared/SettingsItemLabel'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
  clearPinnedApps,
  selectTemporaryPinnedAppsConfigMemoized,
  setTemporaryAppsConfig,
} from '../../../slices/pinnedApps'
import {
  selectDisplayPinnedAppsMemoized,
  selectDisplayTemporaryPinnedAppsMemoized,
  displayPinnedApps,
  displayTemporaryPinnedApps,
} from '../../../slices/preferences'
// Utils
import { displayToast } from '../../../utils/toast'
import { getDateFromStringWithCurrentDateValue, getTimeFromDate, stripDateFromSeconds } from '../../../utils/date'
// Contsants
import {
  activeSwitch,
  inActiveSwitch,
  settingItemButtonRippleConfig,
  settingItemWrapperStyle,
  settingsPressableItemStyle,
  switchTrackColor,
} from '../shared/values'
// TimePicker
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'

const PinnedAppsSettings = () => {
  const dispatch = useDispatch()
  const displayPinnedAppsValue = useSelector(selectDisplayPinnedAppsMemoized)
  const displayTemporaryPinnedAppsValue = useSelector(selectDisplayTemporaryPinnedAppsMemoized)
  const temporaryPinnedAppsConfig = useSelector(selectTemporaryPinnedAppsConfigMemoized)

  const toggleDisplayPinnedApps = () => {
    dispatch(displayPinnedApps(!displayPinnedAppsValue))
  }

  const toggleDisplayTemporaryPinnedApps = () => {
    dispatch(displayTemporaryPinnedApps(!displayTemporaryPinnedAppsValue))
  }

  const onClearPinnedApps = () => {
    dispatch(clearPinnedApps())
    displayToast('All pinned apps cleared successfully!')
  }

  const showTimePicker = (forStartDate: boolean) => {
    DateTimePickerAndroid.open({
      mode: 'time',
      is24Hour: true,
      value: forStartDate
        ? temporaryPinnedAppsConfig.startDate
          ? getDateFromStringWithCurrentDateValue(temporaryPinnedAppsConfig.startDate)!
          : new Date()
        : temporaryPinnedAppsConfig.endDate
        ? getDateFromStringWithCurrentDateValue(temporaryPinnedAppsConfig.endDate)!
        : new Date(),
      onChange: forStartDate ? setTemporaryPinnedAppsStartDate : setTemporaryPinnedAppsEndDate,
    })
  }

  const setTemporaryPinnedAppsStartDate = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type != 'set' || !date) return

    dispatch(
      setTemporaryAppsConfig({
        ...temporaryPinnedAppsConfig,
        startDate: stripDateFromSeconds(date).toString(),
      })
    )
  }

  const setTemporaryPinnedAppsEndDate = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type != 'set' || !date) return

    dispatch(
      setTemporaryAppsConfig({
        ...temporaryPinnedAppsConfig,
        endDate: stripDateFromSeconds(date).toString(),
      })
    )
  }

  return (
    <>
      <View style={settingItemWrapperStyle}>
        <SettingsItemLabel title='Display pinned apps' />
        <Switch
          value={displayPinnedAppsValue}
          onValueChange={toggleDisplayPinnedApps}
          trackColor={switchTrackColor}
          thumbColor={displayPinnedAppsValue ? activeSwitch : inActiveSwitch}
        />
      </View>

      <View style={settingItemWrapperStyle}>
        <SettingsItemLabel title='Display temporary pinned apps' />
        <Switch
          value={displayTemporaryPinnedAppsValue}
          onValueChange={toggleDisplayTemporaryPinnedApps}
          trackColor={switchTrackColor}
          thumbColor={displayTemporaryPinnedAppsValue ? activeSwitch : inActiveSwitch}
        />
      </View>

      <View style={styles.pinnedAppsItemContainer}>
        <SettingsItemLabel
          title='Set start and end time of temporarliy pinned apps'
          description='Click below to set times'
        />
        <View style={styles.pinnedAppsTimePickersWrapper}>
          <Pressable
            onPress={() => showTimePicker(true)}
            android_disableSound={true}
            android_ripple={settingItemButtonRippleConfig}
            style={styles.pinnedAppsTimePicker}>
            <Text style={styles.pinnedAppsTimePickerLabel}>
              Start time is {getTimeFromDate(temporaryPinnedAppsConfig?.startDate)}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => showTimePicker(false)}
            android_disableSound={true}
            android_ripple={settingItemButtonRippleConfig}
            style={styles.pinnedAppsTimePicker}>
            <Text style={styles.pinnedAppsTimePickerLabel}>
              End time is {getTimeFromDate(temporaryPinnedAppsConfig?.endDate)}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={settingItemWrapperStyle}>
        <Pressable
          onPress={onClearPinnedApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={settingsPressableItemStyle}>
          <SettingsItemLabel title='Clear all' />
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  pinnedAppsItemContainer: {
    flexDirection: 'column',
  },
  pinnedAppsTimePickersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pinnedAppsTimePicker: {
    justifyContent: 'center',
    padding: 5,
  },
  pinnedAppsTimePickerLabel: {
    color: '#808080',
  },
})

export default PinnedAppsSettings
