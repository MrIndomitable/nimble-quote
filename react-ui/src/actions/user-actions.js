import axios from 'axios';
import {
  FETCH_USER_DETAILS,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  LOGOUT_FAILURE
} from './types';

const fetchUserDetailsSuccess = (userDetails) => ({
  type: FETCH_USER_DETAILS_SUCCESS, userDetails
});

const fetchUserDetailsFailure = (error) => ({
  type: FETCH_USER_DETAILS_FAILURE, error
});

export const fetchUserDetails = () => dispatch => {
  dispatch({type: FETCH_USER_DETAILS});

  axios.get('/api/user-details')
    .then(res => dispatch(fetchUserDetailsSuccess(res.data)))
    .catch(e => dispatch(fetchUserDetailsFailure(e)));
};

const loginFailure = error => ({
  type: LOGIN_FAILURE, error
});

export const login = ({email, password}) => dispatch => {
  axios.post('/auth/login', {email, password})
    .then(() => dispatch(fetchUserDetails()))
    .catch(e => dispatch(loginFailure(e)));
};

const signupSuccess = dispatch => {
  dispatch(fetchUserDetails());
  dispatch({type: SIGNUP_SUCCESS});
};

const signupFailure = error => ({
  type: SIGNUP_FAILURE, error
});

export const signup = ({email, password}) => dispatch => {
  axios.post('/auth/signup', {email, password})
    .then(() => signupSuccess(dispatch))
    .catch(e => dispatch(signupFailure(e)));
};

const logoutFailure = error => ({
  type: LOGOUT_FAILURE, error
});

export const logout = () => dispatch => {
  dispatch({type: LOGOUT});
  axios.post('/auth/logout')
    .catch(e => dispatch(logoutFailure(e)));
};
