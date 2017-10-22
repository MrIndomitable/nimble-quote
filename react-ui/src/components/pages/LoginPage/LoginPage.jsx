import React from 'react';
import {connect} from 'react-redux'
import {GoogleLoginButton} from "../../SignInButton/SignInButton";
import {LoginForm} from "../../routes/Login/LoginForm";
import {fetchUserDetails, login, signup} from "../../../actions/user-actions";
import {Redirect} from 'react-router-dom';
import {RegisterForm} from "../../routes/Register/Register";

export class LoginPageComp extends React.Component {
  componentWillMount() {
    if (!this.props.user.isLoggedIn) {
      this.props.fetchUserDetails();
    }
  }

  render() {
    if (this.props.user.isLoggedIn) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };

      return <Redirect to={from}/>;
    }

    const {login, signup, renderLogin} = this.props;

    return (
      <div className="container">
        <div className="wrapper login-wrapper">
          {renderLogin && <LoginForm onSubmit={login}/>}
          {!renderLogin && <RegisterForm onSubmit={signup}/>}
          <GoogleLoginButton/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  user
});

const mapDispatchToProps = {
  fetchUserDetails,
  login,
  signup
};

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageComp);