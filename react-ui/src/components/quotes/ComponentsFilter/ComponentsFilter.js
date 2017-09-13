import * as React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {sumComponents} from '../../../selectors/components-selector';

const ComponentsFilterComp = ({offersBadge}) => {
  return <ul className="nav nav-pills nav-justified">
    <li><NavLink to="/components?q=pending">Pending</NavLink></li>
    <li><NavLink to="/components?q=offers">
      Offers {offersBadge > 0 && <span className="badge"> {offersBadge}</span>}
    </NavLink></li>
    <li><NavLink to="/components?q=imminent">Imminent</NavLink></li>
    <li><NavLink to="/components?q=archive">Archive</NavLink></li>
  </ul>;
};

const mapStateToProps = state => ({
  offersBadge: sumComponents(state, 'offers')
});

export const ComponentsFilter = connect(mapStateToProps)(ComponentsFilterComp);