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
    </div>
  }
}

export const Header = HeaderComp;