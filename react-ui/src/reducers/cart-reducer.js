import {ADD_TO_CART, REMOVE_FROM_CART} from "../actions/types";

export const cartReducer = (cart = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const {componentId, auctionId, offerId} = action.payload;
      return {
        ...cart,
        [componentId]: {
          componentId,
          auctionId,
          offerId
        }
      };
    case REMOVE_FROM_CART:
      return {}; // FIXME should remove only componentId in payload
    default:
      return cart;
  }
};