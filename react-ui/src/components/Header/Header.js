import React, {Component} from 'react';
import {AuthButton} from '../SignInButton/SignInButton';
import {NewQuoteButton} from '../NewQuoteButton/NewQuoteButton';
import {AppLogo} from '../AppLogo/AppLogo';
import {Link} from 'react-router-dom';
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
            <li className="menu-item login-btn"><Link title="LOGIN" to="/login">LOGIN</Link></li>
            <li className="menu-item register-btn"><Link title="REGISTER" to="#">REGISTER</Link></li>
          </ul>
        </div>
      </div>
    </div>
  }
}

export const Header = HeaderComp;