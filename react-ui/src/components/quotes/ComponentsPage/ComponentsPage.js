import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ComponentsTable} from '../ComponentsTable/ComponentsTable';
import {ComponentsFilter} from '../ComponentsFilter/ComponentsFilter';
import {fetchAuctions} from '../../../actions/auctions-actions';

class ComponentsPageComp extends Component {
  componentWillMount() {
    this.props.fetchAuctions();
  }

  render() {
    return (
      <div className="container">
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
