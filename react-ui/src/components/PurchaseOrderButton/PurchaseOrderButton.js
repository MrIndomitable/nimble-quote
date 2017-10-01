import React from 'react';

export const PurchaseOrderButton = ({startPurchase}) => {
  return <button className="btn btn-turquoise" onClick={startPurchase}>
    Start Purchase
  </button>
};