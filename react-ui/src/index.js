import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import App from './components/App/App';
import './index.css';

const rootReducer = combineReducers({
  form: formReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
