import React from 'react';
import {connect} from 'react-redux';
import {addToCart} from "../../actions/cart-actions";

const PurchaseOrderButtonComp = ({addToCart, auctionId, componentId, offerId}) => {
  return <button className="btn btn-turquoise" onClick={() => addToCart(auctionId, componentId, offerId)}>
    Start Purchase
  </button>
};

const mapDispatchToProps = {
  addToCart
};

export const PurchaseOrderButton = connect(null, mapDispatchToProps)(PurchaseOrderButtonComp);