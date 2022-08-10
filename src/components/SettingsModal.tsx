import { Modal, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  displayFavoriteApps,
  displayRecentApps,
  selectDisplayFavoriteAppsMemoized,
  selectDisplayRecentAppsMemoized,
} from '../slices/preferences'
import GlobalContext from '../contexts/GlobalContext'

const SettingsModal = () => {
  const dispatch = useDispatch()
  const { displaySettingsModal, toggleDisplaySettingsModal } = useContext(GlobalContext)
  const displayRecentAppsValue = useSelector(selectDisplayRecentAppsMemoized)
  const displayFavoriteAppsValue = useSelector(selectDisplayFavoriteAppsMemoized)

  const toggleDisplayRecentApps = () => {
    dispatch(displayRecentApps(!displayRecentAppsValue))
  }

  const toggleDisplayFavoriteApps = () => {
    dispatch(displayFavoriteApps(!displayFavoriteAppsValue))
  }

  return (
    <Modal
      transparent={true}
      animationType='fade'
      visible={displaySettingsModal}
      onRequestClose={toggleDisplaySettingsModal}>
      <View style={styles.modalWrapper}>
        <View style={styles.modal}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>Display recent apps</Text>
            <Switch
              trackColor={{ false: '#ccc', true: '#ccc' }}
              thumbColor={displayRecentAppsValue ? '#05445E' : '#f4f3f4'}
              onValueChange={toggleDisplayRecentApps}
              value={displayRecentAppsValue}
            />
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>Display favorite apps</Text>
            <Switch
              trackColor={{ false: '#ccc', true: '#ccc' }}
              thumbColor={displayFavoriteAppsValue ? '#05445E' : '#f4f3f4'}
              onValueChange={toggleDisplayFavoriteApps}
              value={displayFavoriteAppsValue}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 75,
  },
  modal: {
    minWidth: '50%',
    elevation: 2.5,
    borderRadius: 5,
    backgroundColor: '#808080',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLabel: {
    color: '#fff',
  },
})

export default SettingsModal
