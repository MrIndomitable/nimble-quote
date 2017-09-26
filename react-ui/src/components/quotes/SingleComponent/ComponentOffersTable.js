import React from 'react';
import {connect} from 'react-redux';
import {PurchaseOrderButton} from '../../PurchaseOrderButton/PurchaseOrderButton';
import {findComponentById} from '../../../selectors/components-selector';
import {withRouter} from 'react-router';
import {fetchComponent} from '../../../actions/components-actions';

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

class ComponentOffersTableWrapper extends React.Component {
  componentWillMount() {
    const {offers, id, fetchComponent} = this.props;

    if (!offers) {
      fetchComponent(id);
    }
  }

  render() {
    const {offers} = this.props;

    if (!offers) {
      return <i className="fa fa-spinner fa-spin fa-5x fa-fw"/>;
    }

    if (offers.length === 0) {
      return <h2>No offers yet</h2>;
    }

    return <ComponentOffersTableComp offers={offers}/>;
  }
}

const mapStateToProps = (state, {match}) => {
  const {id} = match.params;

  const component = findComponentById(state, id);

  return {
    id,
    offers: component && component.offers
  }
};

const mapDispatchToProps = {
  fetchComponent
};

export const ComponentOffersTable = withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentOffersTableWrapper));