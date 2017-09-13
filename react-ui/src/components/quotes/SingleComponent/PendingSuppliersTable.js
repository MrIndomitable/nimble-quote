import React from 'react';

const SupplierRow = ({email, sentDate, status}) => {
  return (
    <tr>
      <td>{email}</td>
      <td>{sentDate}</td>
      <td>{status}</td>
    </tr>
  )
};

export const PendingSuppliersTable = ({suppliers}) => {
  const supplierRows = suppliers.map(supplier => <SupplierRow key={supplier.email} {...supplier}/>);

  return (
    <table className="table text-center">
      <thead>
      <tr>
        <th className="text-center">Supplier</th>
        <th className="text-center">Date</th>
        <th className="text-center">Status</th>
      </tr>
      </thead>
      <tbody>
      {supplierRows}
      </tbody>
    </table>
  )
};
