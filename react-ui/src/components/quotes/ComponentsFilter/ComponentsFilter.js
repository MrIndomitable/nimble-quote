import * as React from 'react';
import {NavLink} from 'react-router-dom';

export const ComponentsFilter = () => {
  return <ul className="nav nav-pills nav-justified">
    <li><NavLink to="/components/pending">Pending</NavLink></li>
    <li><NavLink to="/components/offers">Offers</NavLink></li>
    <li><NavLink to="/components/imminent">Imminent</NavLink></li>
    <li><NavLink to="/components/archive">Archive</NavLink></li>
  </ul>;
};
