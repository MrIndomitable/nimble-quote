import {reduxForm} from 'redux-form';

const PurchaseOrderFormConfig = {
  form: 'PurchaseOrderForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
};

export const PurchaseOrderHOC = reduxForm(PurchaseOrderFormConfig);
