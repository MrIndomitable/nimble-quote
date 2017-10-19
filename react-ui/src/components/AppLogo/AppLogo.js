import React from 'react';
import logo from '../../../public/logo.png';
import './AppLogo.css';
import {Link} from 'react-router-dom';

export const AppLogo = () => {
  return (
    <div className="app-logo">
      <h2>Nimble Quote</h2>
      <Link  to="/">
        <img src={logo} className="App-logo" alt="logo"/>
      </Link>
    </div>
  );
};