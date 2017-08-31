import React from 'react';
import {Link} from 'react-router-dom';

export const NewQuoteButton = () => {
  return <Link to="/quotes/create" className="btn btn-success btn-raised">
    <span className="fa fa-plus"/><span> New Quote</span>
  </Link>
};