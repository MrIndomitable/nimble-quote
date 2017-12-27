import React from 'react';
import {connect} from 'react-redux';
import {PendingSuppliersTable} from './PendingSuppliersTable';
import {ComponentOffersTable} from './ComponentOffersTable';
import {ComponentDetails} from './ComponentDetails';
import {fetchComponent} from '../../../actions/components-actions';
import {findComponentById} from '../../../selectors/components-selector';
import {PurchaseOrderWizard} from "../../PurchaseOrderForm/PurchaseOrderWizard";
import {ProgressDetails} from "./ProgressDetails";

class SingleComponentWrapper extends React.Component {
  componentWillMount() {
    const {fetchRequired, id, fetchComponent} = this.props;

    if (fetchRequired) {
      fetchComponent(id);
    }
  }

  render() {
    const {fetchRequired, isPurchaseInProgress} = this.props;

    if (fetchRequired) {
      return <i className="fa fa-spinner fa-spin fa-5x fa-fw"/>;
    }

    return <div className="container">
      <ProgressDetails />
      <div className="row bg-warning inline single-component-details">
        <ComponentDetails />
      </div>
      { isPurchaseInProgress ? <PurchaseOrderWizard/> : <PendingView/> }
    </div>
  }
}

const PendingView = ({onStartPurchase}) => (
  <div>
    <ComponentOffersTable onStartPurchase={onStartPurchase}/>
    <PendingSuppliersTable/>
  </div>
);

const mapStateToProps = (state, {match}) => {
  const {id} = match.params;
  const component = findComponentById(state, id);
  const fetchRequired = !component || !component.offers;
  const isPurchaseInProgress = Object.keys(state.cart).length > 0;

  return {fetchRequired, id, isPurchaseInProgress}
};

const mapDispatchToProps = {
  fetchComponent
};

export const SingleComponent = connect(mapStateToProps, mapDispatchToProps)(SingleComponentWrapper);