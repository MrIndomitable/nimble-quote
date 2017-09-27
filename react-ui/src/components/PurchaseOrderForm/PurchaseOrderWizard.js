import React, {Component} from 'react';
import {connect} from 'react-redux';
import {submitPurchaseOrder} from '../../actions/po-actions';
import {PurchaseOrderShippingAddressForm} from './PurchaseOrderShippingAddressForm';
import {PurchaseOrderSupplierAddressForm} from './PurchaseOrderSupplierAddressForm';
import {PurchaseOrderSendForm} from './PurchaseOrderSendForm';


export class PurchaseOrderWizardComp extends Component {
  state = {
    page: 1
  };

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const {page} = this.state;
    return (
      <div className="">
        <h3>Purchase Order</h3>
        {page === 1 && <PurchaseOrderShippingAddressForm onSubmit={() => this.nextPage()}/>}
        {page === 2 && <PurchaseOrderSupplierAddressForm previousPage={() => this.previousPage()} onSubmit={() => this.nextPage()}/>}
        {page === 3 && <PurchaseOrderSendForm previousPage={() => this.previousPage()} onSubmit={this.props.onSubmit}/>}
      </div>
    );
  }
}

const mapDispatchToProps = {
  onSubmit: submitPurchaseOrder
};

export const PurchaseOrderWizard = connect(null, mapDispatchToProps)(PurchaseOrderWizardComp);

