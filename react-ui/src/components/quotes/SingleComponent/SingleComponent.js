import React from 'react';
import {connect} from 'react-redux';
import {PendingSuppliersTable} from './PendingSuppliersTable';
import {ComponentOffersTable} from './ComponentOffersTable';
import {ComponentDetails} from './ComponentDetails';
import {fetchComponent} from '../../../actions/components-actions';
import {findComponentById} from '../../../selectors/components-selector';

class SingleComponentWrapper extends React.Component {
  componentWillMount() {
    const {fetchRequired, id, fetchComponent} = this.props;

    if (fetchRequired) {
      fetchComponent(id);
    }
  }

  render() {
    const {fetchRequired} = this.props;

    if (fetchRequired) {
      return <i className="fa fa-spinner fa-spin fa-5x fa-fw"/>;
    }

    return <div className="container">
      <div className="row bg-warning inline single-component-details">
        <ComponentDetails />
      </div>
      <ComponentOffersTable/>
      <PendingSuppliersTable/>
    </div>
  }
}


const mapStateToProps = (state, {match}) => {
  const {id} = match.params;
  const component = findComponentById(state, id);
  const fetchRequired = !component || !component.offers;

  return {fetchRequired, id}
};

const mapDispatchToProps = {
  fetchComponent
};

export const SingleComponent = connect(mapStateToProps, mapDispatchToProps)(SingleComponentWrapper);