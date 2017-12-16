import React from 'react';
import {Route} from 'react-router';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const ProtectedRouteComp = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Component {...props}/>
    )
  )}/>
)

const mapStateToProps = ({user})=>{
    return {isAuthenticated: user.isLoggedIn}
}
export const ProtectedRoute = connect(mapStateToProps, null, null, {pure: false})(ProtectedRouteComp);
