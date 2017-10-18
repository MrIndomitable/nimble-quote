import React from 'react';
import {connect} from 'react-redux';
import {findComponentById} from "../../selectors/components-selector";
import {removeFromCart} from "../../actions/cart-actions";
import Moment from 'moment';

const CartDetailsComp = ({componentId, offer, removeFromCart}) => {
  return (
    <div>
      <hr/>
      <div className="cart-details-headers">
        <div className="">Supplier</div>
        <div className="">Part date</div>
        <div className="">Supply date</div>
        <div className="">Quantity</div>
        <div className="">Offer Price</div>
        <div className="">Total</div>
      </div>
      <div className="cart-details-content" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <div>{offer.supplier}</div>
        <div>{Moment(offer.partDate).format('DD/MM/YYYY')}</div>
        <div>{Moment(offer.supplyDate).format('DD/MM/YYYY')}</div>
        <div>{offer.quantity}</div>
        <div>$ {offer.price}</div>
        <div>$ 79920</div>
        <button className="btn btn-danger" onClick={() => removeFromCart(componentId)}>
          <span className="fa fa-trash-o"/>
        </button>
      </div>
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
