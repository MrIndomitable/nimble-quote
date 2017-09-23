import {combineReducers} from 'redux';
import {quotesReducer} from './quotesReducer';
import {auctionsReducer} from './auctions-reducer';
import {userReducer} from './userReducer';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {componentsReducer} from './components-reducer';

export const rootReducer = combineReducers({
  quotes: quotesReducer,
  auctions: auctionsReducer,
  components: componentsReducer,
  user: userReducer,
  form: formReducer,
  router: routerReducer
});
