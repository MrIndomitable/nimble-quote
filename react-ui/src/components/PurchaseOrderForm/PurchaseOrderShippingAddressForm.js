import React from 'react';
import {reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
import * as v from '../form/Validation/Validation';

export const PurchaseOrderShippingAddressFormComp = ({handleSubmit}) => {
  return <form onSubmit={ handleSubmit }>
    <h4>Shipping address</h4>
    <InputField id="company.name" label="Company" type="text" validate={[v.maxLength10]}/>
    <InputField id="company.contactName" label="Contact name" type="text" validate={[v.maxLength10]}/>
    <InputField id="company.phone" label="Phone" type="text" validate={[v.required]}/>
    <InputField id="company.address" label="Address" type="text" validate={[v.required]}/>
    <InputField id="company.city" label="City" type="text" validate={[v.required]}/>
    <InputField id="company.state" label="State / Province / Region" type="text"/>
    <InputField id="company.country" label="Country" type="text" validate={[v.required]}/>
    <InputField id="company.zip" label="Zip Code" type="text" validate={[v.required]}/>
    <InputField id="company.sameAsBillingAddress" label="Same as billing address" type="checkbox"/>
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
