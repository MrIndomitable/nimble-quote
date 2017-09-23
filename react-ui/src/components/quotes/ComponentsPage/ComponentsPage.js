import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ComponentsTable} from '../PendingQuotesTable/PendingQuotesTable';
import {ComponentsFilter} from '../ComponentsFilter/ComponentsFilter';
import {fetchAuctions} from '../../../actions/auctions-actions';

class ComponentsPageComp extends Component {
  componentWillMount() {
    this.props.fetchAuctions();
  }

  render() {
    return (
      <div>
        <ComponentsFilter/>
        <ComponentsTable/>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAuctions
};

export const ComponentsPage = connect(null, mapDispatchToProps)(ComponentsPageComp);
