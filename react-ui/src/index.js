import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import {quotesReducer} from './reducers/quotesReducer';
import {userReducer} from './reducers/userReducer';
import App from './components/App/App';
import './index.css';

const history = createHistory();
const middleware = routerMiddleware(history);

const rootReducer = combineReducers({
  quotes: quotesReducer,
  user: userReducer,
  form: formReducer,
  router: routerReducer
});
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
