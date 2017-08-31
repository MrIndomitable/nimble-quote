import React, {Component} from 'react';
import {AuthButton} from '../SignInButton/SignInButton';
import {AppLogo} from '../AppLogo/AppLogo';
import './Header.css';

class HeaderComp extends Component {

  render() {
    return <div className="App-header">
      <AppLogo/>
      <AuthButton/>
    </div>
  }
}

export const Header = HeaderComp;