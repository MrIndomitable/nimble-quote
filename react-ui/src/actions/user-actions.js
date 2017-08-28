import axios from 'axios';
import {FETCH_USER_DETAILS, FETCH_USER_DETAILS_SUCCESS, FETCH_USER_DETAILS_FAILURE} from './types';

const fetchUserDetailsSuccess = (userDetails) => ({
  type: FETCH_USER_DETAILS_SUCCESS, userDetails
});

const fetchUserDetailsFailure = (userDetails) => ({
  type: FETCH_USER_DETAILS_FAILURE, userDetails
});

export const fetchUserDetails = () => dispatch => {
  dispatch({type: FETCH_USER_DETAILS});

  axios.get('/api/user-details')
    .then(res => dispatch(fetchUserDetailsSuccess(res.data)))
    .catch(e => dispatch(fetchUserDetailsFailure(e)));
};