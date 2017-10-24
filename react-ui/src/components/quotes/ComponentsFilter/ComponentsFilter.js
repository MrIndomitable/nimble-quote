import * as React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {sumComponents} from '../../../selectors/components-selector';
import {withRouter} from 'react-router-dom';
import {parse} from 'query-string';
import classNames from 'classnames';

const FilterLink = ({label, filter, children, activeFilter}) => (
  <NavLink to={`/components?q=${filter}`} className={classNames({active: activeFilter === filter})}>
    <li>{label || children}</li>
  </NavLink>
);

const ComponentsFilterComp = ({offersBadge, filter}) => (
  <nav  className="arrow-progress-bar-container">
    <ul className="nav arrow-progress-bar">
      <FilterLink label="Pending" filter="pending" activeFilter={filter} />
      <FilterLink filter="offers" activeFilter={filter}>
        Offers {offersBadge > 0 && <span className="badge"> {offersBadge}</span>}
      </FilterLink>
      <FilterLink label="Imminent" filter="imminent" activeFilter={filter} />
      <FilterLink label="Archive" filter="archive" activeFilter={filter} />
    </ul>
  </nav>
);

const mapStateToProps = (state, {location}) => {
  const {q} = parse(location.search);
  return({
    offersBadge: sumComponents(state, 'offers'),
    filter: q
  })
};

export const ComponentsFilter = withRouter(connect(mapStateToProps)(ComponentsFilterComp));