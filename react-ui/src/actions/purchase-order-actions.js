import axios from 'axios';
import {push} from 'react-router-redux';
import {SUBMIT_ORDER, SUBMIT_ORDER_SUCCESS} from "./types";

const submitOrderSuccess = () => ({
  type: SUBMIT_ORDER_SUCCESS
});

export const submitOrder = (auctionId, componentId, offerId) => dispatch => ({company, supplier}) => {
  dispatch({type: SUBMIT_ORDER});

  axios.post('/api/order', {auctionId, componentId, offerId, company, supplier})
    .then(res => {
      dispatch(submitOrderSuccess());
      dispatch(push('/'));
    })
    .catch(e => console.log(e));
};
