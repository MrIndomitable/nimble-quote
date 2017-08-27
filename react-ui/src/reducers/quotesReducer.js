import {SUBMIT_RFP_SUCCESS, FETCH_QUOTES_SUCCESS} from '../actions/types';

export const quotesReducer = (quotes = [], action) => {
  switch (action.type) {
    case SUBMIT_RFP_SUCCESS:
      return [...quotes, action.newQuote];
    case FETCH_QUOTES_SUCCESS:
      return Object.keys(action.quotes).map(key => {
        return action.quotes[key];
      });
    default:
      return quotes;
  }
};
