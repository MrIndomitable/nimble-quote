import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUserDetails} from '../../actions/user-actions';
import {Link} from 'react-router-dom';

export const GoogleLoginButton = () => (
  <a className="auth-button btn btn-raised btn-danger" href="/auth/google">
    <span className="fa fa-google-plus"/> Sign In with Google
  </a>
);

const SignOutButton = ({user, className}) => (
  <div className={className}>
    <span>Hello {user.name || user.email} </span>
    <img src={user.image} className="img-circle" alt=""/>
    <a className="btn btn-danger btn-raised" href="/auth/logout">
      <span className="fa fa-sign-out"/> Logout
    </a>
  </div>
);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  fetchUserDetails
};

export class AuthButton2 extends Component {
  componentWillMount() {
    this.props.fetchUserDetails();
  }

  render() {
    return this.props.user.isLoggedIn ? <SignOutButton className="auth-button" user={this.props.user}/> :
      <GoogleLoginButton className='auth-button'/>;
  }
}

export const AuthButton = connect(mapStateToProps, mapDispatchToProps)(AuthButton2);