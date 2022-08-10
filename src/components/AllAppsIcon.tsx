// React
import React, { useContext } from 'react'
// React Native
import { View } from 'react-native'
// Contexts
import GlobalContext from '../contexts/GlobalContext'
// Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const AllAppsIcon = () => {
  const { toggleDisplayAllApps } = useContext(GlobalContext)

  return (
    <View
      style={{
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          padding: 5,
          borderRadius: 50,
          backgroundColor: '#fff',
        }}>
        <Icon name='dots-hexagon' size={35} color='#000' onPress={toggleDisplayAllApps} />
      </View>
    </View>
  )
}

export default AllAppsIcon
