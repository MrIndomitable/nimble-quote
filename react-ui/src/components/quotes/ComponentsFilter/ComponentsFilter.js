import * as React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {sumComponents} from '../../../selectors/components-selector';
import {withRouter} from 'react-router-dom';
import {parse} from 'query-string';
import classNames from 'classnames';

const FilterLink = ({label, filter, children, activeFilter, color}) => (
  <NavLink to={`/components?q=${filter}`} className={classNames({active: activeFilter === filter})}>
    <li style={{ borderBottom: '10px solid ' + color }}>{label || children}</li>
  </NavLink>
);

const ComponentsFilterComp = ({offersBadge, filter}) => (
  <div className="arrow-progress-bar-wrapper">
  <nav  className="arrow-progress-bar-container">
    <ul className="nav arrow-progress-bar">
      <FilterLink label="Pending" filter="pending" activeFilter={filter} color="#dddddd"/>
      <FilterLink filter="offers" activeFilter={filter} color="rgb(250, 192, 42)">
        Offers {offersBadge > 0 && <span className="badge"> {offersBadge}</span>}
      </FilterLink>
      <FilterLink label="Imminent" filter="imminent" activeFilter={filter} color="rgb(65, 160, 70)"/>
      <FilterLink label="Archive" filter="archive" activeFilter={filter} color="rgb(96, 180, 254)"/>
    </ul>
  </nav>
  </div>
);

const mapStateToProps = (state, {location}) => {
  const {q} = parse(location.search);
  return({
    offersBadge: sumComponents(state, 'offers'),
    filter: q
  })
};

export const ComponentsFilter = withRouter(connect(mapStateToProps)(ComponentsFilterComp));