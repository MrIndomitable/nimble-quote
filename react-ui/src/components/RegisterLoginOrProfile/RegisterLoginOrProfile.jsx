import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from "../../actions/user-actions";

export const RegisterLoginOrProfileComp = ({user, logout}) => {
  if (user.isLoggedIn) {
    return (
      <div className="right-menu-wrap">
        <span>Hello {user.name || user.email} </span>
        <img src={user.image} className="img-circle" alt=""/>
        <button className="btn btn-default btn-sm" onClick={logout}>
          <span className="fa fa-sign-out"/> Logout
        </button>
      </div>
    )
  }

  return (
    <div className="right-menu-wrap">
      <div className="menu-loginregister-container">
        <ul id="menu-loginregister" className="navigation-bar navigation-bar-right">
          <li className="menu-item login-btn"><Link title="LOGIN" to="/login">LOGIN</Link></li>
          <li className="menu-item register-btn"><Link title="REGISTER" to="/register">REGISTER</Link></li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({user}) => ({
  user
});

const mapDispatchToProps = {
  logout
};

export const RegisterLoginOrProfile = connect(mapStateToProps, mapDispatchToProps)(RegisterLoginOrProfileComp);
