import React from 'react';
import {reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
import * as v from '../form/Validation/Validation';


export const PurchaseOrderShippingAddressFormComp = ({handleSubmit}) => {
  return <div className="po-form-container">
    <ul className="nav nav-pills nav-justified">
      <li><a aria-current="false" href="#">1. Shipping address</a></li>
      <li><a aria-current="false" href="#">2. Supplier's address</a></li>
      <li><a aria-current="false" href="#">3. Send purchase order</a></li>
    </ul>

    <form onSubmit={ handleSubmit }>
      <h4>Shipping address</h4>
      <InputField id="shipping.company" label="Company" type="text" validate={[v.maxLength15]}/>
      <InputField id="shipping.shippingStreet" label="Street address" type="text" validate={[v.required]}/>
      <InputField id="shipping.number" label="No." type="text" validate={[v.required, v.number]}/>
      <InputField id="shipping.state" label="State / Province / Region" type="text" validate={[v.required]}/>
      <InputField id="shipping.country" label="Country" type="text" validate={[v.required]}/>
      <InputField id="shipping.zip" label="Zip Code" type="text" validate={[v.required]}/>
      <InputField id="shipping.sameAsBillingAddress" label="Same as billing address" type="checkbox"/>
      <div className="form-group">

        <button type="submit" className="btn btn-success btn-lg pull-right">
          Next <span className="fa fa-caret-right"/>
        </button>
      </div>
    </form>
  </div>
};

export const PurchaseOrderShippingAddressForm = reduxForm({
  form: 'PurchaseOrderForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(PurchaseOrderShippingAddressFormComp);
