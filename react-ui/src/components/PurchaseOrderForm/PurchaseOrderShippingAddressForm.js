import React from 'react';
import {reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
import * as v from '../form/Validation/Validation';


export const PurchaseOrderShippingAddressFormComp = ({handleSubmit}) => {
  return <form onSubmit={ handleSubmit }>
    <h4>Shipping address</h4>
    <InputField id="shipping.company" label="Company" type="text" validate={[v.maxLength15]}/>
    <InputField id="shipping.shippingStreet" label="Street address" type="text" validate={[v.required]}/>
    <InputField id="shipping.number" label="No." type="text" validate={[v.required, v.number]}/>
    <InputField id="shipping.state" label="State / Province / Region" type="text" validate={[v.required]}/>
    <InputField id="shipping.country" label="Country" type="text" validate={[v.required]}/>
    <InputField id="shipping.zip" label="Zip Code" type="text" validate={[v.required]}/>
    <InputField id="shipping.sameAsBillingAddress" label="Same as billing address" type="checkbox"/>
    <div className="form-group btns-wrapper">
      <button type="submit" className="btn  btn-default btn-lg next-button">
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
