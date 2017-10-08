import React from 'react';
import {connect} from 'react-redux';
import {submitOrder} from "../../actions/purchase-order-actions";

const PurchaseOrderButtonComp = ({submitOrder, auctionId, componentId, offerId}) => {
  return <button className="btn btn-turquoise" onClick={() => submitOrder(auctionId, componentId, offerId)}>
    Start Purchase
  </button>
};

const mapDispatchToProps = {
  submitOrder
};

export const PurchaseOrderButton = connect(null, mapDispatchToProps)(PurchaseOrderButtonComp);