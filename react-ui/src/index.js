import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {quotesReducer} from './reducers/quotesReducer';
import App from './components/App/App';
import './index.css';

const rootReducer = combineReducers({
  quotes: quotesReducer,
  form: formReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
