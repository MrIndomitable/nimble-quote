import React from 'react';
import {connect} from 'react-redux';
import {PurchaseOrderButton} from '../../PurchaseOrderButton/PurchaseOrderButton';
import {findComponentById} from '../../../selectors/components-selector';
import {withRouter} from 'react-router';

const OfferRow = ({supplierEmail, partDate, supplyDate, quantity, price, total}) => {
  const ExpandOffer = () => <button type="button" className="btn btn-link">
    <span className="glyphicon glyphicon-menu-down"/>
  </button>;

  return (
    <tr>
      <td>{supplierEmail}</td>
      <td>{partDate}</td>
      <td>{supplyDate}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{total}</td>
      <td><PurchaseOrderButton/></td>
      <td><ExpandOffer/></td>
    </tr>
  )
};

export const ComponentOffersTableComp = ({offers}) => {
  if (offers.length === 0) {
    return <h2>No offers yet</h2>;
  }

  const offerRows = offers.map(offer => (
    <OfferRow key={offer.id} {...offer}/>
  ));

  return (
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
  )
};

const mapStateToProps = (state, {match}) => {
  const {id} = match.params;

  const component = findComponentById(state, id);

  const offers = component && component.offers;
  const offersWithTotal = offers.map(offer => {
    return {...offer, total: offer.price * offer.quantity}
  });

  return {
    offers: offersWithTotal
  }
};

export const ComponentOffersTable = withRouter(connect(mapStateToProps)(ComponentOffersTableComp));