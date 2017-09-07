import {FETCH_COMPONENTS_SUCCESS} from '../actions/types';

export const auctionsReducer = (auctions = [], action) => {
  switch (action.type) {
    case FETCH_COMPONENTS_SUCCESS:
      return action.quotes.auctions;
    default:
      return auctions;
  }
};