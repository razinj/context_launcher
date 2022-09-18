// React Native
import { NativeModules } from 'react-native'
// Models
import { AppsModuleInterface } from '../models/native-module'

const { AppsModule } = NativeModules

export default AppsModule as AppsModuleInterface
