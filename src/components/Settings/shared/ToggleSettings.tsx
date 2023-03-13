// React
import React, { useState } from 'react'
// React Native
import { Pressable, StyleSheet, View } from 'react-native'
// Components
import SettingsItemLabel from './SettingsItemLabel'
import CustomIcon from '../../shared/CustomIcon'
// Constants
import { settingItemButtonRippleConfig } from './values'
// Models
import { ToggleSettingsProps as Props } from '../../../models/props'

const ToggleSettings = ({ title, description, children }: Props) => {
  const [renderSettings, setRenderSettings] = useState(false)

  return (
    <>
      <View style={renderSettings ? [styles.wrapper, styles.activeWrapper] : styles.wrapper}>
        <Pressable
          testID='settings-bottom-toggle-advanced-settings-button'
          onPress={() => setRenderSettings(!renderSettings)}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={styles.pressable}>
          <SettingsItemLabel
            title={title}
            description={description}
            titleStyle={renderSettings ? [styles.activeTitle] : []}
          />
          <CustomIcon name={`chevron-${renderSettings ? 'up' : 'down'}`} size={30} color='#808080' />
        </Pressable>
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
