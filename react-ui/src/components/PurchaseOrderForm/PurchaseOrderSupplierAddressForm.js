import React from 'react';
import {reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
import * as v from '../form/Validation/Validation';

export const PurchaseOrderSupplierAddressFormComp = ({previousPage, handleSubmit}) => {
  return <form onSubmit={ handleSubmit } className="container">
    <h4>Supplier's address</h4>
    <InputField id="supplier.company" label="Company" type="text" validate={[v.required]}/>
    <InputField id="supplier.contactName" label="Contact name" type="text" validate={[v.required]}/>
    <InputField id="supplier.phone" label="Phone" type="text" validate={[v.required]}/>
    <InputField id="supplier.address" label="Address" type="text" validate={[v.required]}/>
    <InputField id="supplier.state" label="State" type="text"/>
    <InputField id="supplier.country" label="Country" type="text" validate={[v.required]}/>
    <InputField id="supplier.zip" label="Zip Code" type="text" validate={[v.required]}/>
    <div className="form-group btns-wrapper">
      <button className="btn btn-default btn-lg back-button" onClick={previousPage}>
        <span className="fa fa-caret-left"/> Back
      </button>
      <button type="submit" className="btn  btn-default btn-lg next-button">
        Next <span className="fa fa-caret-right"/>
      </button>
    </div>
  </form>
};

export const PurchaseOrderSupplierAddressForm = reduxForm({
  form: 'PurchaseOrderForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(PurchaseOrderSupplierAddressFormComp);
