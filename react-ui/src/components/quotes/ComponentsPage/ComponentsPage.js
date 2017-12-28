import React, {Component} from 'react';
import {connect} from 'react-redux';
import {parse} from 'query-string';

import {ComponentsTable} from '../ComponentsTable/ComponentsTable';
import {ComponentsFilter} from '../ComponentsFilter/ComponentsFilter';
import {fetchAuctions} from '../../../actions/auctions-actions';
import {ProgressDetails} from "../SingleComponent/ProgressDetails";

class ComponentsPageComp extends Component {
  componentWillMount() {
    this.props.fetchAuctions();
  }

  render() {
    return (
      <div className="container">
      {
        !this.props.bom ? (<ComponentsFilter/>) : (<ProgressDetails />)
      }
        <ComponentsTable/>
      </div>
    );
  }
}

const mapStateToProps = (state, {location}) => {
  console.log('---------------------',location);
  const {search} = parse(location.search);
  if(search) {
    return ({
      bom: search
    });
  }
};

const mapDispatchToProps = {
  fetchAuctions
};

export const ComponentsPage = connect(mapStateToProps, mapDispatchToProps)(ComponentsPageComp);
