import React from 'react';
import {Link} from 'react-router-dom';
import './Button.css';

export const Button = ({className, value}) => {
  return <Link to="#" className={className}>
     {value}
  </Link>
};