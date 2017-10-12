import React from 'react';
import {connect} from 'react-redux';
import {PurchaseOrderButton} from '../../PurchaseOrderButton/PurchaseOrderButton';
import {findComponentById} from '../../../selectors/components-selector';
import {withRouter} from 'react-router';
import {getSupplierEmail} from "../../../selectors/suppliers-selector";

const OfferRow = ({supplier, partDate, supplyDate, quantity, price, total, auctionId, componentId, offerId}) => (
  <tr>
    <td>{supplier}</td>
    <td>{partDate}</td>
    <td>{supplyDate}</td>
    <td>{quantity}</td>
    <td>{price}</td>
    <td>{total}</td>
    <td><PurchaseOrderButton auctionId={auctionId} componentId={componentId} offerId={offerId}/></td>
  </tr>
);

const ComponentOffersTableComp = ({offers, component}) => {
  if (offers.length === 0) {
    return <h2>No offers yet</h2>;
  }

  const offerRows = offers.map(offer => (
    <OfferRow
      key={offer.id}
      {...offer}
      auctionId={component.auctionId}
      componentId={component.id}
      offerId={offer.id}
    />
  ));

  return (
    <div className="table-container single-component-offers-table">
      <table className="table table-hover text-center">
        <thead>
        <tr>
          <th className="text-center">Supplier</th>
          <th className="text-center">Part date</th>
          <th className="text-center">Supply date</th>
          <th className="text-center">Quantity <a href="#">
            <span className="glyphicon glyphicon-sort-by-attributes-alt"/>
          </a>
          </th>
          <th className="text-center">Offer price <a href="#">
            <span className="glyphicon glyphicon-sort"/>
          </a>
          </th>
          <th className="text-center">Total</th>
          <th className="text-center"/>
        </tr>
        </thead>
        <tbody>
        {offerRows}
        </tbody>
      </table>
    </div>
  )
};

const mapStateToProps = (state, {match}) => {
  const {id} = match.params;
  const component = findComponentById(state, id);
  const offers = component && component.offers;

  const offersWithTotal = offers.map(offer => {
    const total = offer.price * offer.quantity;
    const supplier = getSupplierEmail(state, offer.supplierId);
    return {
      ...offer,
      total,
      supplier
    }
  });

  return {
    component,
    offers: offersWithTotal
  }
};

export const ComponentOffersTable = withRouter(connect(mapStateToProps)(ComponentOffersTableComp));