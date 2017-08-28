import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUserDetails} from '../../actions/user-actions';
import logo2 from '../../../public/logo.png';
import './Header.css';

class HeaderClass extends Component {
  componentWillMount() {
    this.props.fetchUserDetails()
  }

  render() {
    return <HeaderComp {...this.props}/>
  }
}

const SignInButton = () => (
  <a className="btn btn-danger btn-lg" href="/auth/google">
    <span className="fa fa-google-plus"/> Sign In with Google
  </a>
);

const SignOutButton = ({user}) => (
  <div>
    <span>Hello {user.name || user.email} </span>
    <img src={user.image} className="img-circle" alt=""/>
    <a className="btn btn-danger btn-lg" href="/auth/logout">
      <span className="fa fa-sign-out"/> Logout
    </a>
  </div>
);

const AuthButton = ({user}) => {
  return user.isLoggedIn ? <SignOutButton user={user}/> : <SignInButton/>;
};

const HeaderComp = ({user}) => {
  return <div className="App-header">
    <img src={logo2} className="App-logo" alt="logo"/>
    <h2>Welcome to Nimble Quote</h2>
    <AuthButton user={user}/>
  </div>;
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  fetchUserDetails
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderClass);