import axios from 'axios';
import { push } from 'react-router-redux'
import {SUBMIT_PURCHASE_ORDER, SUBMIT_PURCHASE_ORDER_SUCCESS, SUBMIT_PURCHASE_ORDER_FAILURE} from './types';

export const submitPurchaseOrder = values => dispatch => {
    console.log(values);
    dispatch({
        type: SUBMIT_PURCHASE_ORDER, values
    });

      dispatch(push('/'));


};

// export const submitRFP = values => dispatch => {


//     // TODO it should be the values of redux form
//     const bom = {
//         components: values.details
//     };
//     const auction = {
//         suppliers: [values.supplier],
//         subject: values.subject,
//         message: values.message,
//         bom
//     };

//     axios.post('/api/auctions', auction)
//         .then(res => dispatch(submitRFPSuccess(res.data.details)))
//         .catch(e => dispatch(submitRFPFailure(e)));
// };