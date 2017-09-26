import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import {rootReducer} from './reducers/root-reducer';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger'

export const configureStore = (history) => {
  const middleware = routerMiddleware(history);
  return createStore(
    rootReducer,
    applyMiddleware(thunk, middleware, createLogger())
  );
};
