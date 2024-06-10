import { all } from 'redux-saga/effects'
import { appStateSaga } from './slices/appStateHandler'
import { appsListSagas } from './slices/appsListHandler'

export default function* rootSaga() {
  yield all([appStateSaga(), appsListSagas()])
}
