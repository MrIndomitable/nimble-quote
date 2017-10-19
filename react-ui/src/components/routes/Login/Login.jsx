import React from 'react';
// import axios from 'axios';
// import {parse} from 'query-string';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import {AuthButton} from '../../SignInButton/SignInButton';
import './login.css';

export class Login extends React.Component {
  // state = {
  //   auth: false
  // };
render(){
  
  return(
    <div className = "container">
      <div className="wrapper login-wrapper">
        <form action="" method="post" name="Login_Form" className="form-signin">       
            <h3 className="form-signin-heading">Please Login</h3>
            
            <input type="text" className="form-control" name="Username" placeholder="Username" required="" autofocus="" /><br/>
            <input type="password" className="form-control" name="Password" placeholder="Password" required=""/>     		  
          
            <button className="btn btn-lg btn-primary btn-block"  name="Submit" value="Login" type="Submit">Login</button>  			
        </form>			
      <AuthButton/>
      </div>
    </div>
  );
};

};