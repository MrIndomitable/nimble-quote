import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ComponentsTable} from '../PendingQuotesTable/PendingQuotesTable';
import {fetchAuctions} from '../../../actions/rfp-actions';

class ComponentsPageComp extends Component {
  componentWillMount() {
    this.props.fetchAuctions()
  }

  render() {
    return (
      <div>
        <ComponentsTable/>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAuctions
};

export const ComponentsPage = connect(null, mapDispatchToProps)(ComponentsPageComp);
