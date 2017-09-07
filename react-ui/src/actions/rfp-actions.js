import axios from 'axios';
import { push } from 'react-router-redux'
import {SUBMIT_RFP, SUBMIT_RFP_SUCCESS, SUBMIT_RFP_FAILURE} from './types';
import {FETCH_QUOTES, FETCH_QUOTES_SUCCESS, FETCH_QUOTES_FAILURE} from './types';

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

  dispatch(push('/'));

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

const fetchAuctionsSuccess = (data) => ({
  type: FETCH_QUOTES_SUCCESS,
  quotes: data
});

const fetchAuctionsFailure = (error) => ({
  type: FETCH_QUOTES_FAILURE,
  error
});

// TODO should be fetchAuctions
export const fetchQuotes = () => dispatch => {
  dispatch({
    type: FETCH_QUOTES
  });

  axios.get('/api/auctions')
    .then(res => dispatch(fetchAuctionsSuccess(res.data)))
    .catch(e => dispatch(fetchAuctionsFailure(e)));
};