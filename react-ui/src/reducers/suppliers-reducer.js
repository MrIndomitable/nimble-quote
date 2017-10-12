import {FETCH_AUCTIONS_SUCCESS} from "../actions/types";

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
    case FETCH_AUCTIONS_SUCCESS:
      return action.auctions
        .reduce(toSupplierList, [])
        .reduce(toSupplierMap, {...suppliers});
    default:
      return suppliers;
  }
};