import * as React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {sumComponents} from '../../../selectors/components-selector';

const FilterLink = ({label, filter, children}) => (
  <NavLink to={`/components?q=${filter}`}>
    <li>{label || children}</li>
  </NavLink>
);

const ComponentsFilterComp = ({offersBadge}) => (
  <div className="arrow-progress-bar-container">
    <ul className="arrow-progress-bar">
      <FilterLink label="Pending" filter="pending"/>
      <FilterLink filter="offers">
        Offers {offersBadge > 0 && <span className="badge"> {offersBadge}</span>}
      </FilterLink>
      <FilterLink label="Imminent" filter="imminent"/>
      <FilterLink label="Archive" filter="archive"/>
    </ul>
  </div>
);

const mapStateToProps = state => ({
  offersBadge: sumComponents(state, 'offers')
});

export const ComponentsFilter = connect(mapStateToProps)(ComponentsFilterComp);