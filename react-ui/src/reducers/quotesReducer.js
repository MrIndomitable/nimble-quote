import {SUBMIT_RFP_SUCCESS, FETCH_QUOTES_SUCCESS} from '../actions/types';

export const quotesReducer = (quotes = [], action) => {
  switch (action.type) {
    case SUBMIT_RFP_SUCCESS:
      return [...quotes, action.newQuote];
    case FETCH_QUOTES_SUCCESS:
      const arrayOfDetails = Object.keys(action.quotes).map(key => {
        return action.quotes[key].details;
      });
      
      return [].concat.apply([], arrayOfDetails);
    default:
      return quotes;
  }
};
