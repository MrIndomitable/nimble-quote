import React, {Component} from 'react';
import {AuthButton} from '../SignInButton/SignInButton';
import {NewQuoteButton} from '../NewQuoteButton/NewQuoteButton';
import {AppLogo} from '../AppLogo/AppLogo';
import './Header.css';

class HeaderComp extends Component {
  render() {
    return <div className="App-header">
      <AppLogo/>
      <NewQuoteButton/>
      <AuthButton/>
      <div className="right-menu-wrap">
        <div className="menu-loginregister-container">
          <ul id="menu-loginregister" className="navigation-bar navigation-bar-right">
            <li className="menu-item login-btn"><a title="LOGIN" href="/login">LOGIN</a></li>
            <li className="menu-item register-btn"><a title="REGISTER" href="#">REGISTER</a></li>
          </ul>
        </div>
      </div>
    </div>
  }
}

export const Header = HeaderComp;