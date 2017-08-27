import axios from 'axios';
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

  axios.post('/api/rfp', values)
    .then(res => dispatch(submitRFPSuccess(res.data)))
    .catch(e => dispatch(submitRFPFailure(e)));
};

const fetchQuotesSuccess = (data) => ({
  type: FETCH_QUOTES_SUCCESS,
  quotes: data
});

const fetchQuotesFailure = (error) => ({
  type: FETCH_QUOTES_FAILURE,
  error
});

export const fetchQuotes = () => dispatch => {
  dispatch({
    type: FETCH_QUOTES
  });

  axios.get('/api/rfp')
    .then(res => dispatch(fetchQuotesSuccess(res.data)))
    .catch(e => dispatch(fetchQuotesFailure(e)));
};