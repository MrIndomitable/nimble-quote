import {FETCH_USER_DETAILS_SUCCESS} from '../actions/types';

export const userReducer = (user = {}, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS_SUCCESS:
      return action.userDetails;
    default:
      return user;
  }
};
