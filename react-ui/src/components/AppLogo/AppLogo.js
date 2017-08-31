import React from 'react';
import logo from '../../../public/logo.png';
import './AppLogo.css';

export const AppLogo = () => {
  return (
    <div className="app-logo">
      <h2>Nimble Quote</h2>
      <img src={logo} className="App-logo" alt="logo"/>
    </div>
  );
};