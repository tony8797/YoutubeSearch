import { all } from 'redux-saga/effects';
import youtubeSearchSagas from './YoutubeSearch/sagas';
export default function* rootSaga(getState) {
  yield all([
    youtubeSearchSagas(),
  ]);
}
