import axios from 'axios';
import {push} from 'react-router-redux';
import {SUBMIT_RFP, SUBMIT_RFP_SUCCESS, SUBMIT_RFP_FAILURE} from './types';

const submitRFPSuccess = (data) => ({
  type: SUBMIT_RFP_SUCCESS, newQuote: data
});

const submitRFPFailure = (error) => ({
  type: SUBMIT_RFP_FAILURE, error
});

export const submitRFP = values => dispatch => {
  dispatch({
    type: SUBMIT_RFP, values
  });

  // dispatch(push('/'));

  // TODO it should be the values of redux form
  const bom = {
    components: values.details
  };

  const auction = {
    suppliers: values.suppliers,
    subject: values.subject,
    message: values.message,
    bom
  };

  axios.post('/api/auctions', auction)
    .then(res => dispatch(submitRFPSuccess(res.data.details)))
    .catch(e => dispatch(submitRFPFailure(e)));
};

export const goToComponent = id => dispatch => {
  dispatch(push(`/components/${id}`));
};
