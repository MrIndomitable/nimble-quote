import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {PurchaseOrderButton} from '../../PurchaseOrderButton/PurchaseOrderButton';
import {findComponentById} from '../../../selectors/components-selector';
import {withRouter} from 'react-router';
import {getSupplierEmail} from "../../../selectors/suppliers-selector";

const dateFormat = 'DD/MM/YYYY';

class OfferRow extends React.Component  {
  constructor(props) {
    super(props);
    this.state = ({ opened: false, emailContent: "Hey, this is my offer\nLooking forward to hearing from you" });
  }
  sendEmail(e) {
     e.stopPropagation();
     e.nativeEvent.stopImmediatePropagation();
     console.log('send sendEmail');
  }
  tapText(e) {
    e.stopPropagation();
     e.nativeEvent.stopImmediatePropagation();
  }
  updateEmail(evt) {
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
    this.setState({ emailContent: evt.target.value });
  }
  render() {
    const { opened, emailContent } = this.state;
    const {supplier, partDate, supplyDate, quantity, price, total, auctionId, componentId, offerId} = this.props;
    if(!opened) {
      return <tr onClick={() => {this.setState({opened: !opened})}}>
        <td>{supplier}</td>
        <td>{moment(partDate).format(dateFormat)}</td>
        <td>{moment(supplyDate).format(dateFormat)}</td>
        <td>{quantity}</td>
        <td>${price}</td>
        <td>${total}</td>
        <td><PurchaseOrderButton auctionId={auctionId} componentId={componentId} offerId={offerId}/></td>
        <td><i className="material-icons">arrow_drop_down</i></td>
      </tr>;
    } else {
      return <tr onClick={() => {this.setState({opened: !opened})}}>
        <td>{supplier}<p><textarea value={ emailContent } onClick={ this.tapText } onChange={ evt => this.updateEmail(evt) }></textarea></p></td>
        <td>{moment(partDate).format(dateFormat)}</td>
        <td>{moment(supplyDate).format(dateFormat)}</td>
        <td>{quantity}</td>
        <td>${price}<p><button onClick={ this.sendEmail }><i className="fa fa-envelope-o" aria-hidden="true"></i> Send email</button></p></td>
        <td>${total}</td>
        <td><PurchaseOrderButton auctionId={auctionId} componentId={componentId} offerId={offerId}/></td>
        <td><i className="material-icons">arrow_drop_up</i></td>
      </tr>;
    }
  }
}

const ComponentOffersTableComp = ({offers, component}) => {
  if (offers.length === 0) {
    return <h2>No offers yet</h2>;
  }
  console.log(JSON.stringify(offers));
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