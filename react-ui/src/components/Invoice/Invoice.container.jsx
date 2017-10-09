import {connect} from 'react-redux';
import {formValueSelector} from 'redux-form'
import {withRouter} from 'react-router';
import {findComponentById} from "../../selectors/components-selector";
import {Invoice as InvoiceComp} from './Invoice';

const mapStateToProps = (state, {match}) => { // FIXME offerId should come from url or from redux
  const {id} = match.params;

  const selector = formValueSelector('PurchaseOrderForm');
  const {company, supplier} = selector(state, 'company', 'supplier');

  const components = Object.keys(state.cart).map(componentId => {
    const {offerId} = state.cart[componentId];
    const component = findComponentById(state, id);
    const offer = component.offers.find(offer => offer.id === offerId);

    return {
      id: component.id,
      description: `${component.manufacture} - ${component.partNumber}`,
      quantity: offer.quantity,
      price: offer.price,
      total: offer.price * offer.quantity
    };
  });

  const totals = {
    total: components.reduce((sum, component) => sum + component.total, 0)
  };

  return {
    components,
    company,
    supplier,
    totals
  }
};

export const Invoice = withRouter(connect(mapStateToProps)(InvoiceComp));