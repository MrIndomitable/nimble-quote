import {FETCH_COMPONENTS_SUCCESS} from './types';
import axios from 'axios';

export const fetchComponent = id => dispatch => {
  const onSuccess = res => dispatch({
    type: FETCH_COMPONENTS_SUCCESS, components: res.data.components
  });

  axios.get(`/api/components/${id}`)
    .then(onSuccess)
    .catch(e => console.log(e));
};
