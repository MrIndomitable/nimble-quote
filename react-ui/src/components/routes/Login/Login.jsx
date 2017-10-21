import React from 'react';
import {reduxForm} from 'redux-form';
import {InputField} from '../../form/InputField';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import {AuthButton} from '../../SignInButton/SignInButton';
import './login.css';

export const LoginComp = () => {
  return <div  className = "container">
    <div className="wrapper login-wrapper"><form className="form-signin">
      <h3 className="form-signin-heading">Please Login</h3>
      <InputField id="username" label="Username" placeholder="Username" type="text"/>
      <InputField id="password" label="Password" placeholder="Password" type="password"/>
      <div className="form-group btns-wrapper">
        <button
          onClick={
            e => {
              e.preventDefault();
              axios.post('/auth/signup', { email: 'abc', password: '123' })
                .then(res => console.log('signed up, just reload'))
                .catch(e => console.log('error while signing up', e));
            }
          }
          className="btn btn-lg btn-primary btn-block"  name="Submit" value="Login" type="Submit">Login</button>
      </div>
    </form>
      <AuthButton/>
    </div>
  </div>
};

export const Login = reduxForm({
  form: 'LoginForm',
  destroyOnUnmount: true,
})(LoginComp);

