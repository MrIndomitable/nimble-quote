import React from 'react';
import {reduxForm} from 'redux-form';
import {Invoice} from '../Invoice/Invoice.container';

export const PurchaseOrderViewEmailComp = ({previousPage, handleSubmit}) => {
  return (
    <div>
      <Invoice/>
      <div className="clearfix btns-wrapper">
        <div className="text-center">
          <button className="btn btn-default btn-lg back-button" onClick={previousPage}>
            <span className="fa fa-caret-left"/> Back
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-default btn-lg next-button"
          >
            Purchase <span className="fa fa-caret-right"/>
          </button>
        </div>
      </div>
    </div>
  )
};

export const PurchaseOrderSendForm = reduxForm({
  form: 'PurchaseOrderForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(PurchaseOrderViewEmailComp);