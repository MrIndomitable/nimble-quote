export const getSupplierEmail = (state, id) => {
  return state.suppliers[id] && state.suppliers[id].email;
};