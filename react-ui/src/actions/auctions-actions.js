import {FETCH_AUCTIONS_SUCCESS, FETCH_AUCTIONS_FAILURE, FETCH_AUCTIONS} from './types';
import axios from 'axios';

const fetchAuctionsSuccess = (data) => ({
  type: FETCH_AUCTIONS_SUCCESS,
  auctions: data.auctions
});

const fetchAuctionsFailure = (error) => ({
  type: FETCH_AUCTIONS_FAILURE,
  error
});

export const fetchAuctions = () => dispatch => {
  dispatch({
    type: FETCH_AUCTIONS
  });

  axios.get('/api/auctions')
    .then(res => dispatch(fetchAuctionsSuccess(res.data)))
    .catch(e => dispatch(fetchAuctionsFailure(e)));
};

export const fetchAuction = id => dispatch => {
  dispatch({
    type: FETCH_AUCTIONS
  });

  axios.get(`/api/auctions/${id}`)
    .then(res => dispatch(fetchAuctionsSuccess(res.data)))
    .catch(e => dispatch(fetchAuctionsFailure(e)));
};
