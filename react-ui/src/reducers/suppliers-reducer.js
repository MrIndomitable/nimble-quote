import {ADD_NEW_SUPPLIER_SUCCESS, FETCH_AUCTIONS_SUCCESS, FETCH_SUPPLIERS_SUCCESS} from "../actions/types";

const toSupplierList = (all, auction) => [
  ...all,
  ...auction.suppliers
];

const toSupplierMap = (all, supplier) => ({
  ...all,
  [supplier.id]: supplier
});

export const suppliersReducer = (suppliers = {}, action) => {
  switch (action.type) {
    case ADD_NEW_SUPPLIER_SUCCESS:
      const {id, email} = action.payload;
      return {
        ...suppliers,
        [id]: {id, email}
      };
    case FETCH_SUPPLIERS_SUCCESS:
      const copyOfSuppliers = {...suppliers};
      return action.suppliers.reduce(toSupplierMap, copyOfSuppliers);
    case FETCH_AUCTIONS_SUCCESS:
      return action.auctions
        .reduce(toSupplierList, [])
        .reduce(toSupplierMap, {...suppliers});
    default:
      return suppliers;
  }
};