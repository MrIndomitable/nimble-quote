import React from 'react';
import {NewQuoteButton} from '../NewQuoteButton/NewQuoteButton';
import {AppLogo} from '../AppLogo/AppLogo';
import './Header.css';
import {RegisterLoginOrProfile} from "../RegisterLoginOrProfile/RegisterLoginOrProfile";

export const Header = () => (
  <div className="App-header">
    <AppLogo/>
    <NewQuoteButton/>
    <RegisterLoginOrProfile/>
  </div>
);