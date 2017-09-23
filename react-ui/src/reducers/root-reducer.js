import {combineReducers} from 'redux';
import {auctionsReducer} from './auctions-reducer';
import {userReducer} from './userReducer';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {componentsReducer} from './components-reducer';

export const rootReducer = combineReducers({
  auctions: auctionsReducer,
  components: componentsReducer,
  user: userReducer,
  form: formReducer,
  router: routerReducer
});
