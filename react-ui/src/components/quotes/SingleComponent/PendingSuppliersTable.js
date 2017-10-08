import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getAuctionById} from '../../../selectors/auctions-selector';
import {findComponentById} from '../../../selectors/components-selector';
import {fetchAuction} from '../../../actions/auctions-actions';

const SupplierRow = ({email, sentDate, status}) => (
  <tr>
    <td>{email}</td>
    <td>{sentDate}</td>
    <td>{status}</td>
  </tr>
);

const PendingSuppliersTableComp = ({suppliers}) => {
  if (!suppliers) {
    return null;
  }

  const supplierRows = suppliers.map(supplier => <SupplierRow key={supplier.email} {...supplier}/>);

  return (
    <div className="table-container single-component-pending-table">
      <h3>Pending</h3>
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
    </div>
  )
};

class PendingSuppliersTableWrapper extends React.Component {
  componentWillMount() {
    const {fetchAuction, fetchRequired, auctionId} = this.props;

    if (fetchRequired) {
      fetchAuction(auctionId);
    }
  }

  render() {
    const {suppliers} = this.props;
    return <PendingSuppliersTableComp suppliers={suppliers}/>
  }
}

const mapStateToProps = (state, {match}) => {
  const {id} = match.params;

  const component = findComponentById(state, id);
  const auction = getAuctionById(state)(component.auctionId);

  return {
    fetchRequired: !auction,
    suppliers: auction && auction.suppliers,
    auctionId: component.auctionId
  };
};

const mapDispatchToProps = {
  fetchAuction
};

export const PendingSuppliersTable = withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingSuppliersTableWrapper));