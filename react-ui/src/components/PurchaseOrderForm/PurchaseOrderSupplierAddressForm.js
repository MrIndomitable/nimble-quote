import React from 'react';
import {reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
import { required, length } from 'redux-form-validators'


export const PurchaseOrderSupplierAddressFormComp = ({previousPage, handleSubmit}) => {
  return <form onSubmit={ handleSubmit } className="container">
    <h4>Supplier's address</h4>
    <InputField autoFocus id="supplier.company" label="Company" type="text" validate={[required(), length({ max: 50 })]}/>
    <InputField id="supplier.contactName" label="Contact name" type="text" validate={[required(), length({ max: 50 })]}/>
    <InputField id="supplier.phone" label="Phone" type="text" validate={[required(), length({ max: 50 })]}/>
    <InputField id="supplier.address" label="Address" type="text" validate={[required(), length({ max: 50 })]}/>
    <InputField id="supplier.state" label="State" type="text"/>
    <InputField id="supplier.country" label="Country" type="text" validate={[required(), length({ max: 50 })]}/>
    <InputField id="supplier.zip" label="Zip Code" type="text" validate={[required(), length({ max: 50 })]}/>
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
