import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getAuctionById} from '../../../selectors/auctions-selector';
import {findComponentById} from '../../../selectors/components-selector';

const SupplierRow = ({email, sentDate, status}) => {
  return (
    <tr>
      <td>{email}</td>
      <td>{sentDate}</td>
      <td>{status}</td>
    </tr>
  )
};

export const PendingSuppliersTableComp = ({suppliers}) => {
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

const mapStateToProps = (state, {match}) => {
  const {id} = match.params;
  
  const component = findComponentById(state, id);
  const {suppliers} = getAuctionById(state)(component.auctionId);

  return { suppliers: suppliers }
};

export const PendingSuppliersTable = withRouter(connect(mapStateToProps)(PendingSuppliersTableComp));