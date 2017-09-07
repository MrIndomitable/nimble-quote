import {SUBMIT_RFP_SUCCESS, FETCH_COMPONENTS_SUCCESS} from '../actions/types';

export const quotesReducer = (quotes = [], action) => {
  switch (action.type) {
    case SUBMIT_RFP_SUCCESS:
      return [...quotes, action.newQuote];
    case FETCH_COMPONENTS_SUCCESS:
      // TODO convert to pending components selector
      return action.quotes.auctions
        .reduce((components, auction) =>
          [...components, ...auction.bom.components], []
        );
    default:
      return quotes;
  }
};
