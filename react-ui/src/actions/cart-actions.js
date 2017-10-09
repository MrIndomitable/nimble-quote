import {ADD_TO_CART, REMOVE_FROM_CART} from "./types";

export const addToCart = (auctionId, componentId, offerId) => ({
  type: ADD_TO_CART,
  payload: {
    auctionId,
    componentId,
    offerId
  }
});

export const removeFromCart = (componentId) => ({
  type: REMOVE_FROM_CART,
  payload: {
    componentId
  }
});