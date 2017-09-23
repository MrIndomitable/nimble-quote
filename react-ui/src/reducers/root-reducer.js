import {combineReducers} from 'redux';
import {quotesReducer} from './quotesReducer';
import {auctionsReducer} from './auctions-reducer';
import {userReducer} from './userReducer';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

export const rootReducer = combineReducers({
  quotes: quotesReducer,
  auctions: auctionsReducer,
  user: userReducer,
  form: formReducer,
  router: routerReducer
});
