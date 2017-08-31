import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';

export const QuotesLifeCycle = () => {
  return <ul className="nav nav-pills nav-justified">
    <li><NavLink to="/quotes/pending">Pending</NavLink></li>
    <li><NavLink to="/quotes/offers">Offers</NavLink></li>
    <li><NavLink to="/quotes/imminent">Imminent</NavLink></li>
    <li><NavLink to="/quotes/archive">Archive</NavLink></li>
  </ul>;
};