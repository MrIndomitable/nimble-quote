import axios from 'axios';
import {push} from 'react-router-redux';

export const submitOrder = (auctionId, componentId, offerId) => dispatch => {
  axios.post('/api/order', {auctionId, componentId, offerId})
    .then(res => dispatch(push('/')))
    .catch(e => console.log(e));
};
