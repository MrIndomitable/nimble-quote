import {FETCH_AUCTIONS_SUCCESS} from '../actions/types';

export const auctionsReducer = (auctions = [], action) => {
  switch (action.type) {
    case FETCH_AUCTIONS_SUCCESS:
      return action.auctions;
    default:
      return auctions;
  }
};