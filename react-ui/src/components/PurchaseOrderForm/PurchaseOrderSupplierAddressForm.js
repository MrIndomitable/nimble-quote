import React from 'react';
import {reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';

export const PurchaseOrderSupplierAddressFormComp = ({previousPage, handleSubmit}) => {
  return <form onSubmit={ handleSubmit } className="container">
    <h3>Supplier's address</h3>
    <InputField id="company" label="Company" type="text"/>
    <InputField id="country" label="Country" type="text"/>
    <InputField id="state" label="State" type="text"/>
    <InputField id="street" label="St." type="text"/>
    <InputField id="number" label="No." type="text"/>
    <InputField id="zip" label="Zip Code" type="text"/>
    <div className="text-center">
      <button className="btn btn-default btn-lg" onClick={previousPage}>
        <span className="fa fa-caret-left"/> Back
      </button>
      <button type="submit" className="btn btn-success btn-lg">
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
