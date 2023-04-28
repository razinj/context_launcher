import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import React, { useMemo } from 'react'
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { sortPinnedApps, sortTemporaryPinnedApps } from '../../../slices/appState'
import {
  clearPinnedApps,
  selectPinnedAppsCountMemoized,
  selectTemporaryPinnedAppsConfigMemoized,
  selectTemporaryPinnedAppsCountMemoized,
  setTemporaryAppsConfig,
} from '../../../slices/pinnedApps'
import {
  displayPinnedApps,
  displayTemporaryPinnedApps,
  selectDisplayPinnedAppsMemoized,
  selectDisplayTemporaryPinnedAppsMemoized,
} from '../../../slices/preferences'
import { getDateFromStringWithCurrentDateValue, getTimeFromDate, stripDateFromSeconds } from '../../../utils/date'
import { displayToast } from '../../../utils/toast'
import SettingsItemLabel from '../shared/SettingsItemLabel'
import {
  activeSwitch,
  inActiveSwitch,
  settingItemButtonRippleConfig,
  settingItemWrapperStyle,
  settingsPressableItemStyle,
  switchTrackColor,
} from '../shared/values'

// TODO: For tests of this component: https://github.com/react-native-datetimepicker/datetimepicker#testing-with-jest

const PinnedAppsSettings = () => {
  const dispatch = useDispatch()
  const displayPinnedAppsValue = useSelector(selectDisplayPinnedAppsMemoized)
  const pinnedAppsCount = useSelector(selectPinnedAppsCountMemoized)
  const displayTemporaryPinnedAppsValue = useSelector(selectDisplayTemporaryPinnedAppsMemoized)
  const temporaryPinnedAppsCount = useSelector(selectTemporaryPinnedAppsCountMemoized)
  const temporaryPinnedAppsConfig = useSelector(selectTemporaryPinnedAppsConfigMemoized)

  const toggleDisplayPinnedApps = () => {
    dispatch(displayPinnedApps(!displayPinnedAppsValue))
  }

  const toggleDisplayTemporaryPinnedApps = () => {
    dispatch(displayTemporaryPinnedApps(!displayTemporaryPinnedAppsValue))
  }

  const onClearPinnedApps = () => {
    dispatch(clearPinnedApps({ temporarily: false }))
    displayToast('Pinned apps cleared successfully!')
  }

  const onClearTemporarilyPinnedApps = () => {
    dispatch(clearPinnedApps({ temporarily: true }))
    displayToast('Temporarily pinned apps cleared successfully!')
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
    if (event.type !== 'set' || !date) return

    dispatch(
      setTemporaryAppsConfig({
        ...temporaryPinnedAppsConfig,
        startDate: stripDateFromSeconds(date).toString(),
      })
    )
  }

  const setTemporaryPinnedAppsEndDate = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type !== 'set' || !date) return

    dispatch(
      setTemporaryAppsConfig({
        ...temporaryPinnedAppsConfig,
        endDate: stripDateFromSeconds(date).toString(),
      })
    )
  }

  const onPinnedAppsSortViewClick = () => {
    dispatch(sortPinnedApps())
  }

  const onTemporaryPinnedAppsSortViewClick = () => {
    dispatch(sortTemporaryPinnedApps())
  }

  const pinnedAppsSortDisabled = useMemo(
    () => pinnedAppsCount <= 1 || !displayPinnedAppsValue,
    [pinnedAppsCount, displayPinnedAppsValue]
  )

  const temporaryPinnedAppsSortDisabled = useMemo(
    () => temporaryPinnedAppsCount <= 1 || !displayTemporaryPinnedAppsValue,
    [temporaryPinnedAppsCount, displayTemporaryPinnedAppsValue]
  )

  return (
    <>
      <View style={settingItemWrapperStyle}>
        <SettingsItemLabel title='Display pinned apps' />
        <Switch
          testID='display-pinned-apps-button'
          value={displayPinnedAppsValue}
          onValueChange={toggleDisplayPinnedApps}
          trackColor={switchTrackColor}
          thumbColor={displayPinnedAppsValue ? activeSwitch : inActiveSwitch}
        />
      </View>

      <View style={settingItemWrapperStyle}>
        <Pressable
          testID='sort-pinned-apps-button'
          disabled={pinnedAppsSortDisabled}
          onPress={onPinnedAppsSortViewClick}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={[settingsPressableItemStyle, { opacity: pinnedAppsSortDisabled ? 0.5 : 1 }]}>
          <SettingsItemLabel
            title='Sort pinned apps'
            description={
              pinnedAppsSortDisabled
                ? displayPinnedAppsValue
                  ? 'Add more apps to be able to sort'
                  : 'Display pinned apps to be able to sort'
                : 'Click to start sorting'
            }
          />
        </Pressable>
      </View>

      <View style={settingItemWrapperStyle}>
        <SettingsItemLabel title='Display temporary pinned apps' />
        <Switch
          testID='display-temporarily-pinned-apps-button'
          value={displayTemporaryPinnedAppsValue}
          onValueChange={toggleDisplayTemporaryPinnedApps}
          trackColor={switchTrackColor}
          thumbColor={displayTemporaryPinnedAppsValue ? activeSwitch : inActiveSwitch}
        />
      </View>

      <View style={settingItemWrapperStyle}>
        <Pressable
          testID='sort-temporarily-pinned-apps-button'
          disabled={temporaryPinnedAppsSortDisabled}
          onPress={onTemporaryPinnedAppsSortViewClick}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={[settingsPressableItemStyle, { opacity: temporaryPinnedAppsSortDisabled ? 0.5 : 1 }]}>
          <SettingsItemLabel
            title='Sort temporarily pinned apps'
            description={
              temporaryPinnedAppsSortDisabled
                ? displayTemporaryPinnedAppsValue
                  ? 'Add more apps to be able to sort'
                  : 'Display temporarily pinned apps to be able to sort'
                : 'Click to start sorting'
            }
          />
        </Pressable>
      </View>

      <View style={styles.pinnedAppsItemContainer}>
        <SettingsItemLabel
          title='Set start and end time of temporarliy pinned apps'
          description='Click below to set times'
        />
        <View style={styles.pinnedAppsTimePickersWrapper}>
          <Pressable
            testID='set-start-time-button'
            onPress={() => showTimePicker(true)}
            android_disableSound={true}
            android_ripple={settingItemButtonRippleConfig}
            style={styles.pinnedAppsTimePicker}>
            <Text style={styles.pinnedAppsTimePickerLabel}>
              Start time is {getTimeFromDate(temporaryPinnedAppsConfig?.startDate)}
            </Text>
          </Pressable>
          <Pressable
            testID='set-end-time-button'
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
          testID='clear-pinned-apps-button'
          onPress={onClearPinnedApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={settingsPressableItemStyle}>
          <SettingsItemLabel title='Clear pinned apps' />
        </Pressable>
      </View>

      <View style={settingItemWrapperStyle}>
        <Pressable
          testID='clear-temporarily-pinned-apps-button'
          onPress={onClearTemporarilyPinnedApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={settingsPressableItemStyle}>
          <SettingsItemLabel title='Clear temporarily pinned apps' />
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
