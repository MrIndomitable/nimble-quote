import React from 'react';
import {connect} from 'react-redux';
import {findComponentById} from '../../../selectors/components-selector';
import {getAuctionById} from '../../../selectors/auctions-selector';
import {PendingSuppliersTable} from './PendingSuppliersTable';
import {OffersTable} from './ComponentOffersTable';

const SingleComponentComp = (props) => {
  return (
    <div className="container">
      <div className="row bg-warning inline">
        <div className="text-center">
          <div className="col-lg-2 ">
            <p> Manufacture</p>
            <p className=""><strong>{props.component.manufacture}</strong></p>
          </div>
          <div className="col-lg-2">
            <p className="">Part No.</p>
            <p className=""><strong>{props.component.partNumber}</strong></p>
          </div>
          <div className="col-lg-2">
            <p className="">Quantity</p>
            <p className=""><strong>{props.component.quantity}</strong></p>
          </div>
          <div className="col-lg-2">
            <p className="">Target price</p>
            <p className=""><strong>{props.component.targetPrice}</strong></p>
          </div>

          <div className="col-lg-2">
            <p className="">Part date</p>
            <p className=""><strong>{props.component.partDate}</strong></p>
          </div>
          <div className="col-lg-2">
            <br/>
            <button className="btn btn-default">Send to archive</button>
          </div>
        </div>
      </div>
      <div className="table-container col-lg-12">
        <OffersTable offers={props.offers}/>
      </div>

      <div className="table-container col-lg-12">
        <h2>Pending</h2>
        <PendingSuppliersTable suppliers={props.suppliers}/>
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