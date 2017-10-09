import React from 'react';
import {reduxForm} from 'redux-form';
import {PurchaseOrderTemplate} from '../EmailTemplates/PurchaseOrderTemplate';

export const PurchaseOrderViewEmailComp = ({previousPage}) => {
  return (
    <div>
      <PurchaseOrderTemplate />
      <div className="clearfix btns-wrapper">
        <div className="text-center">
          <button className="btn btn-default btn-lg back-button" onClick={previousPage}>
            <span className="fa fa-caret-left"/> Back
          </button>
          <button type="submit" className="btn btn-default btn-lg next-button">
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