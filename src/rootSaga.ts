import { all, fork } from 'redux-saga/effects'
import { appsListSagas } from './slices/appsListHandler'
import { appStateSaga } from './slices/appStateHandler'

export default function* rootSaga() {
  yield fork(appsListSagas)
  yield all([appStateSaga()])
  // yield all([appStateSaga(), appsListSagas()])
}
