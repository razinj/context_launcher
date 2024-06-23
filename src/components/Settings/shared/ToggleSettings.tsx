import React, { PropsWithChildren, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CustomIcon from '../../shared/CustomIcon'
import CustomPressable from '../../shared/CustomPressable'
import SettingsItemLabel from './SettingsItemLabel'
import { settingItemButtonRippleConfig } from './values'

export type ToggleSettingsProps = PropsWithChildren<{ title: string; description?: string }>

const ToggleSettings = ({ title, description, children }: ToggleSettingsProps) => {
  const [renderSettings, setRenderSettings] = useState(false)

  return (
    <>
      <View style={renderSettings ? [styles.wrapper, styles.activeWrapper] : styles.wrapper}>
        <CustomPressable
          testID='toggle-settings-button'
          onPress={() => setRenderSettings(!renderSettings)}
          android_ripple={settingItemButtonRippleConfig}
          style={styles.pressable}>
          <SettingsItemLabel
            title={title}
            description={description}
            titleStyle={renderSettings ? [styles.activeTitle] : []}
          />
          <CustomIcon name={`chevron-${renderSettings ? 'up' : 'down'}`} size={30} color='#808080' />
        </CustomPressable>
      </View>

      {renderSettings && children}
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
  },
  activeWrapper: {
    backgroundColor: '#ececec',
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeTitle: {
    fontWeight: 'bold',
  },
})

export default ToggleSettings
