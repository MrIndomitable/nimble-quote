import React from 'react';
import {reduxForm} from 'redux-form';
import {PurchaseOrderTemplate} from '../EmailTemplates/PurchaseOrderTemplate';

export const PurchaseOrderViewEmailComp = ({previousPage, handleSubmit}) => {

        return(
            <div className="container">
             <PurchaseOrderTemplate />
                <div className="clearfix">
                    <div className="text-center">
                        <button className="btn btn-default btn-lg" onClick={previousPage}>
                            <span className="fa fa-caret-left"/> Back
                        </button>
                        <button type="submit" className="btn btn-success btn-lg">
                            Next 
                            <span className="fa fa-caret-right"/>
                        </button>
                    </div>
                </div>
            </div>  
        )

}

export const PurchaseOrderSendForm = reduxForm({
  form: 'PurchaseOrderForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(PurchaseOrderViewEmailComp);