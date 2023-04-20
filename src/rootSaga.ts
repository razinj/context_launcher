import { all } from 'redux-saga/effects'
import { appsListSagas } from './slices/appsListHandler'
import { appStateSaga } from './slices/appStateHandler'

export default function* rootSaga() {
  yield all([appStateSaga(), appsListSagas()])
}
