import {ADD_TO_CART, REMOVE_FROM_CART, SUBMIT_ORDER_SUCCESS} from "../actions/types";

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
    case SUBMIT_ORDER_SUCCESS:
      return {}; // FIXME should remove only componentId in payload
    default:
      return cart;
  }
};