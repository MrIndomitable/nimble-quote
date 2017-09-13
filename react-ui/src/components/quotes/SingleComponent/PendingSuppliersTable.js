import React from 'react';

const SupplierRow = ({supplier}) => {
  return (
    <tr>
      <td>{supplier.email}</td>
      <td>{supplier.review}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{supplier.sentDate}</td>
      <td>{supplier.status}</td>
    </tr>
  )
};

export const PendingSuppliersTable = ({suppliers}) => {
  const supplierRows = suppliers.map(supplier => {
    return (
      <SupplierRow key={supplier.email} supplier={supplier}/>
    )
  });

  return (
    <table className="table text-center">
      <thead>
      <tr>
        <th className="text-center">Supplier</th>
        <th className="text-center">Review
        </th>
        <th className="text-center"></th>
        <th className="text-center"></th>
        <th className="text-center"></th>
        <th className="text-center"></th>
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
