import React from 'react';
import {PurchaseOrderButton} from '../../PurchaseOrderButton/PurchaseOrderButton';

const OfferRow = ({offer}) => {
  return (
    <tr>
      <td>{offer.supplier}</td>
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
      <td>{supplier.supplier}</td>
      <td>{supplier.review}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{supplier.date}</td>
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
            <p className=""><strong>{props.component.partNo}</strong></p>
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

export const SingleComponent = () => {
  const component = {
    manufacture: "xyz",
    partNo: "123",
    quantity: "33",
    targetPrice: "350",
    partDate: "22.3.2017"
  };

  const offers = [
    {
      supplier: "Atdsa@gmail.com",
      review: "3",
      partDate: "1.1.2017",
      supplyDate: "1.9.2018",
      quantity: "12",
      offerPrice: "770",
      total: "7770",
    },
    {
      supplier: "Atdsa@gmail.com",
      review: "5",
      partDate: "1.1.2017",
      supplyDate: "1.9.2018",
      quantity: "12",
      offerPrice: "770",
      total: "7770",
    },
    {
      supplier: "Atdsa@gmail.com",
      review: "1",
      partDate: "1.1.2017",
      supplyDate: "1.9.2018",
      quantity: "12",
      offerPrice: "770",
      total: "7770",
    },
  ];

  const pendingSuppliers = [
    {
      supplier: "XSZsa@gmail.com",
      review: "5",
      date: "1.1.2017",
      status: "1.9.2018",
    },
    {
      supplier: "XSZsa@gmail.com",
      review: "2",
      date: "1.1.2017",
      status: "1.9.2018",
    },
    {
      supplier: "XSZsa@gmail.com",
      review: "3",
      date: "1.1.2017",
      status: "1.9.2018",
    },
  ];

  return (<SingleComponentComp component={component} suppliers={pendingSuppliers} offers={offers}/>)
};