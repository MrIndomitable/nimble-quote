import React from 'react';
import {GoogleLoginButton} from "../../SignInButton/SignInButton";
import {LoginForm} from "../../routes/Login/LoginForm";

export class LoginPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="wrapper login-wrapper">
          <LoginForm/>
          <GoogleLoginButton/>
        </div>
      </div>
    );
  }
}
