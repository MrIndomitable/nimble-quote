import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PurchaseOrderShippingAddressForm} from './PurchaseOrderShippingAddressForm';
import {PurchaseOrderSupplierAddressForm} from './PurchaseOrderSupplierAddressForm';
import {PurchaseOrderSendForm} from './PurchaseOrderSendForm';
import {CartDetails} from "./CartDetails";
import {submitOrder} from "../../actions/purchase-order-actions";

export class PurchaseOrderWizardComp extends Component {
  state = {
    page: 1
  };

  nextPage() {
    this.setState({page: this.state.page + 1})
  }

  previousPage() {
    this.setState({page: this.state.page - 1})
  }

  render() {
    const {page} = this.state;
    return (
      <div className="po-form-container">
        <CartDetails/>
        <ul className="nav nav-pills nav-justified">
          <li><a aria-current="false" href="#">1. Shipping address</a></li>
          <li><a aria-current="false" href="#">2. Supplier's address</a></li>
          <li><a aria-current="false" href="#">3. Send purchase order</a></li>
        </ul>
        {page === 1 && <PurchaseOrderShippingAddressForm onSubmit={() => this.nextPage()}/>}
        {page === 2 && <PurchaseOrderSupplierAddressForm previousPage={() => this.previousPage()} onSubmit={() => this.nextPage()}/>}
        {page === 3 && <PurchaseOrderSendForm previousPage={() => this.previousPage()} onSubmit={this.props.onSubmit}/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const componentId = Object.keys(state.cart)[0];
  const {auctionId, offerId} = state.cart[componentId];

  return {
    auctionId,
    componentId,
    offerId
  }
};

const mapDispatchToProps = {
  submitOrder
};

const mergeProps = ({auctionId, componentId, offerId}, {submitOrder}, ownProps) => ({
  onSubmit: submitOrder(auctionId, componentId, offerId),
  ...ownProps
});

export const PurchaseOrderWizard = connect(mapStateToProps, mapDispatchToProps, mergeProps)(PurchaseOrderWizardComp);

