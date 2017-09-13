import React from 'react';
import {connect} from 'react-redux';
import {PurchaseOrderButton} from '../../PurchaseOrderButton/PurchaseOrderButton';
import {findComponentById} from '../../../selectors/components-selector';
import {getAuctionById} from '../../../selectors/auctions-selector';

const OfferRow = ({offer}) => {
  return (
    <tr>
      <td>{offer.supplierEmail}</td>
      <td>{offer.review}</td>
      <td> {offer.partDate}</td>
      <td> {offer.supplyDate}</td>
      <td> {offer.quantity}</td>
      <td> {offer.offerPrice}</td>
      <td> {offer.total}</td>
      <td>
        <PurchaseOrderButton />
      </td>
      <td>
        <button type="button" className="btn btn-link"><span className="glyphicon glyphicon-menu-down"></span></button>
      </td>
    </tr>
  )
};

const OffersTable = ({offers}) => {
  const offerRows = offers.map(offer => {
    return (
      <OfferRow offer={offer}/>
    )
  });
  return (
    <table className="table table-hover text-center">
      <thead>
      <tr>
        <th className="text-center">Supplier</th>
        <th className="text-center">Review <a href="#">
          <span className="glyphicon glyphicon-sort-by-attributes-alt"></span>
        </a>
        </th>
        <th className="text-center">Part date</th>
        <th className="text-center">Supply date</th>
        <th className="text-center">Quantity <a href="#">
          <span className="glyphicon glyphicon-sort"></span>
        </a>
        </th>
        <th className="text-center">Offer price <a href="#">
          <span className="glyphicon glyphicon-sort"></span>
        </a>
        </th>
        <th className="text-center">Total</th>
        <th className="text-center"></th>
      </tr>
      </thead>
      <tbody>
      {offerRows}
      </tbody>
    </table>
  )
};

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
}

const PendingSuppliersTable = ({suppliers}) => {
  const supplierRows = suppliers.map(supplier => {
    return (
      <SupplierRow supplier={supplier}/>
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