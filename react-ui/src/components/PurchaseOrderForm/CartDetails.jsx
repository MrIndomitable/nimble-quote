import React from 'react';
import {connect} from 'react-redux';
import {findComponentById} from "../../selectors/components-selector";
import {removeFromCart} from "../../actions/cart-actions";
import Moment from 'moment';

const CartDetailsComp = ({componentId, offer, removeFromCart}) => {
  return (
    <div>
      <hr/>
      <div className="cart-details-content">
        <div className="col-lg-2 ">
          <p>Supplier</p>
          <p className=""><strong>{offer.supplier}</strong></p>
        </div>
        <div className="col-lg-2 ">
          <p>Part date</p>
          <p className=""><strong>{Moment(offer.partDate).format('DD/MM/YYYY')}</strong></p>
        </div>
        <div className="col-lg-2 ">
          <p>Supply date</p>
          <p className=""><strong>{Moment(offer.supplyDate).format('DD/MM/YYYY')}</strong></p>
        </div>
        <div className="col-lg-2 ">
          <p>Quantity</p>
          <p className=""><strong>{offer.quantity}</strong></p>
        </div>
        <div className="col-lg-2 ">
          <p>Offer Price</p>
          <p className=""><strong>$ {offer.price}</strong></p>
        </div>
        <div className="col-lg-2 ">
          <p>Total</p>
          <p className=""><strong>$ 79920</strong></p>
        </div>
        <div className="col-lg-2 ">
        <button className="btn btn-danger" onClick={() => removeFromCart(componentId)}>
          <span className="fa fa-trash-o"/>
        </button>
        </div>
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
