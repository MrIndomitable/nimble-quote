import axios from 'axios';
import {FETCH_SUPPLIERS_SUCCESS, ADD_NEW_SUPPLIER_SUCCESS} from "./types";

const fetchSuppliersSuccess = ({suppliers}) => ({
  type: FETCH_SUPPLIERS_SUCCESS, suppliers
});

const addNewSupplierSuccess = (supplierId, email) => ({
  type: ADD_NEW_SUPPLIER_SUCCESS, payload: {id: supplierId, email}
});

export const addNewSupplier = (email) => dispatch => {
  return axios.post('/api/suppliers', {email})
    .then(res => dispatch(addNewSupplierSuccess(res.data, email)))
    .then(action => action.payload)
    .catch(e => console.log('addNewSupplier failed', e));
};

export const fetchSuppliers = () => dispatch => {
  axios.get('/api/suppliers')
    .then(res => dispatch(fetchSuppliersSuccess(res.data)))
    .catch(e => console.log('fetchSuppliers failed', e));
};