import React from 'react';
import {reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
// import {PurchaseOrderHOC} from './PurchaseOrderWizardConfig';


export const PurchaseOrderShippingAddressFormComp = ({previousPage, handleSubmit}) => {
    return <form onSubmit={ handleSubmit } className="container">
    <h4>Shipping address</h4>
    <InputField id="company" label="Company" type="text"/>
    <InputField id="street" label="Street address" type="text"/>
    <InputField id="number" label="No." type="text"/>
    <InputField id="state" label="State / Province / Region" type="text"/>
    <InputField id="country" label="Country" type="text"/>
    <InputField id="zip" label="Zip Code" type="text"/>
    <InputField id="sameAsBillingAddress" label="Same as billing address" type="checkbox"/>
    <div className="text-center">
    <button className="btn btn-default btn-lg ">
      <span className="fa fa-caret-left"/> Back
    </button>
    <button type="submit" className="btn btn-success btn-lg p-3">
      Next <span className="fa fa-caret-right"/>
    </button>
    </div>
  </form>
};

export const PurchaseOrderShippingAddressForm = reduxForm({
  form: 'PurchaseOrderForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(PurchaseOrderShippingAddressFormComp);

// export const PurchaseOrderShippingAddressForm = PurchaseOrderHOC(PurchaseOrderShippingAddressFormComp);

