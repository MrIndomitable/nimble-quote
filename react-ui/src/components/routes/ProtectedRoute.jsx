import React from 'react';
import {Route} from 'react-router';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const ProtectedRouteComp = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>

    )
  )}/>
)

const mapStateToProps = ({user})=>{
    return {isAuthenticated: user.isLoggedIn}
}
export const ProtectedRoute = connect(mapStateToProps, null, null, {pure: false})(ProtectedRouteComp);
