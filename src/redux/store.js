import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const bindMiddleware = middleware => {
  return applyMiddleware(...middleware);
};
const store = createStore(rootReducer, bindMiddleware(middlewares));
sagaMiddleware.run(rootSaga);
export { store };
