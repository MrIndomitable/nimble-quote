import React from 'react';
import {connect} from 'react-redux';
import {findComponentById} from "../../selectors/components-selector";
import {removeFromCart} from "../../actions/cart-actions";

const CartDetailsComp = ({componentId, offer, removeFromCart}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
      <div>{offer.supplier}</div>
      <div>{offer.price}</div>
      <div>{offer.quantity}</div>
      <div>{offer.partDate}</div>
      <div>{offer.supplyDate}</div>
      <button className="btn btn-danger" onClick={() => removeFromCart(componentId)}>
        <span className="fa fa-trash-o"/>
      </button>
    </div>
  )
};

const mapStateToProps = (state) => {
  const componentId = Object.keys(state.cart)[0];
  const {offerId} = state.cart[componentId];
  const component = findComponentById(state, componentId);
  const offer = component.offers.find(o => o.id === offerId);

  const supplier = offer.supplierId; // FIXME should be supplier email (not yet in redux store)

  return {
    componentId,
    offer: {
      supplier,
      price: offer.price,
      quantity: offer.quantity,
      partDate: offer.partDate,
      supplyDate: offer.supplyDate
    }
  }
};

const mapDispatchToProps = {removeFromCart};

export const CartDetails = connect(mapStateToProps, mapDispatchToProps)(CartDetailsComp);
