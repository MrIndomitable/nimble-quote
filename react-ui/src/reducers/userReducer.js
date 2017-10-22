import {FETCH_USER_DETAILS_SUCCESS, LOGOUT} from '../actions/types';

export const userReducer = (user = {}, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS_SUCCESS:
      return action.userDetails;
    case LOGOUT:
      return {};
    default:
      return user;
  }
};
