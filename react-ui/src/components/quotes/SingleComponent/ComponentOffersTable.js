import React from 'react';
import {connect} from 'react-redux';
import {PurchaseOrderButton} from '../../PurchaseOrderButton/PurchaseOrderButton';
import {findComponentById} from '../../../selectors/components-selector';
import {withRouter} from 'react-router';

const OfferRow = ({supplierEmail, partDate, supplyDate, quantity, offerPrice, total}) => {
  const ExpandOffer = () => <button type="button" className="btn btn-link">
    <span className="glyphicon glyphicon-menu-down"/>
  </button>;

  return (
    <tr>
      <td>{supplierEmail}</td>
      <td>{partDate}</td>
      <td>{supplyDate}</td>
      <td>{quantity}</td>
      <td>{offerPrice}</td>
      <td>{total}</td>
      <td><PurchaseOrderButton/></td>
      <td><ExpandOffer/></td>
    </tr>
  )
};

export const ComponentOffersTableComp = ({offers}) => {
  const offerRows = offers.map(offer => (
    <OfferRow key={offer.supplierEmail} {...offer}/>
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

  return { offers: component.offers }
};

export const ComponentOffersTable = withRouter(connect(mapStateToProps)(ComponentOffersTableComp));