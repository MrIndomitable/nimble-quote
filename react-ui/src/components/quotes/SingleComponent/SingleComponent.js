import React from 'react';
import {connect} from 'react-redux';
import {findComponentById} from '../../../selectors/components-selector';
import {getAuctionById} from '../../../selectors/auctions-selector';
import {PendingSuppliersTable} from './PendingSuppliersTable';
import {ComponentOffersTable} from './ComponentOffersTable';
import {ComponentDetails} from './ComponentDetails';

const SingleComponentComp = (props) => {
  return (
    <div className="container">
      <div className="row bg-warning inline">
        <ComponentDetails />
      </div>
      <div className="table-container col-lg-12">
        <ComponentOffersTable />
      </div>

      <div className="table-container col-lg-12">
        <h2>Pending</h2>
        <PendingSuppliersTable/>
      </div>
    </div>
  )
};

const mapStateToProps = (state, {match}) => {
  const {id} = match.params;

  const component = findComponentById(state, id);
  const {suppliers} = getAuctionById(state)(component.auctionId);

  return {
    component,
    suppliers: suppliers,
    offers: component.offers
  }
};

export const SingleComponent = connect(mapStateToProps)(SingleComponentComp);