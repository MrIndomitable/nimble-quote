import React from 'react';
import './Invoice.css';
import Moment from 'moment';


export const Invoice = ({company, supplier, components, totals}) => {
  // const today = '11/12/13';
  const today = Moment().format('DD/MM/YYYY');
  const reference = '123';

  const stateAndCountry = ({state, country}) => state ? `${state}, ${country}` : country;

  return (
    <div className="preview">
      <header className="invoice-header">
        <h1 className="company-name">{company.name}</h1>
        <div className="company">
          <div>{company.contactName}</div>
          <div>{company.address}</div>
          <div>{company.zip} {company.city}</div>
          <div>{stateAndCountry(company)}</div>
          <div>Phone: {company.phone}</div>
        </div>
        <div className="extra">
          <div>PO # {reference}</div>
          <div>Date of issue {today}</div>
        </div>
      </header>
      <section>
        <div className="info">
          <div className="recipient">
            <div>{supplier.company}</div>
            <div>{supplier.contactName}</div>
            <div>{supplier.address}</div>
            <div>{supplier.zip} {supplier.city}</div>
            <div>{stateAndCountry(supplier)}</div>
            <div>{supplier.phone}</div>
          </div>
        </div>
        <table className="components">
          <thead>
          <tr>
            <th>Component description</th>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Total</th>
          </tr>
          </thead>
          <tfoot>
          <tr className="total-row">
            <td>Total</td>
            <td/>
            <td/>
            <td>$ {totals.total}</td>
          </tr>
          </tfoot>
          <tbody>
          {components.map((component) => (
            <tr key={component.id}>
              <td>{component.description}</td>
              <td>{component.quantity}</td>
              <td>$ {component.price}</td>
              <td>$ {component.total}</td>
            </tr>)
          )}
          </tbody>
        </table>
      </section>
    </div>
  )
};