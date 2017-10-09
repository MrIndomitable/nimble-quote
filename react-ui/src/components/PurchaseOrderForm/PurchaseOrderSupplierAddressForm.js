import React from 'react';
import {reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
import * as v from '../form/Validation/Validation';

export const PurchaseOrderSupplierAddressFormComp = ({previousPage, handleSubmit}) => {
  return <form onSubmit={ handleSubmit } className="container">
    <h4>Supplier's address</h4>
    <InputField id="supplier.company" label="Company" type="text" validate={[v.required, v.maxLength15]}/>
    <InputField id="supplier.country" label="Country" type="text" validate={[v.required, v.maxLength15]}/>
    <InputField id="supplier.state" label="State" type="text" validate={[v.required]}/>
    <InputField id="supplier.street" label="St." type="text" validate={[v.required]}/>
    <InputField id="supplier.number" label="No." type="text" validate={[v.required, v.number]}/>
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
