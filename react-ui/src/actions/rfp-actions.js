import axios from 'axios';
import {SUBMIT_RFP, SUBMIT_RFP_SUCCESS, SUBMIT_RFP_FAILURE} from './types';

const submitRFPSuccess = (data) => ({
  type: SUBMIT_RFP_SUCCESS, data
});

const submitRFPFailure = (error) => ({
  type: SUBMIT_RFP_FAILURE, error
});

export const submitRFP = values => dispatch => {
  dispatch({
    type: SUBMIT_RFP, values
  });

  axios.post('/api/rfp', values)
    .then(res => dispatch(submitRFPSuccess(res.data)))
    .catch(e => dispatch(submitRFPFailure(e)));
};
