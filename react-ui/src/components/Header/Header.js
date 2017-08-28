import React from 'react';
import logo2 from '../../../public/logo.png';
import './Header.css';

export const Header = () => {
  return <div className="App-header">
    <img src={logo2} className="App-logo" alt="logo"/>
    <h2>Welcome to Nimble Quote</h2>
    <a className="btn btn-primary btn-lg" href="/auth/google">Sign In with Google</a>
  </div>;
};
