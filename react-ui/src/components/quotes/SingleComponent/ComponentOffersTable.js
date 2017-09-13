import React from 'react';
import {PurchaseOrderButton} from '../../PurchaseOrderButton/PurchaseOrderButton';

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

export const OffersTable = ({offers}) => {
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
