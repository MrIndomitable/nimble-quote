import {combineReducers} from 'redux';
import {auctionsReducer} from './auctions-reducer';
import {userReducer} from './userReducer';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {componentsReducer} from './components-reducer';
import {cartReducer} from "./cart-reducer";
import {suppliersReducer} from "./suppliers-reducer";

export const rootReducer = combineReducers({
  auctions: auctionsReducer,
  components: componentsReducer,
  suppliers: suppliersReducer,
  cart: cartReducer,
  user: userReducer,
  form: formReducer,
  router: routerReducer
});
