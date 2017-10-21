import React from 'react';
import {reduxForm} from 'redux-form';
import {InputField} from '../../form/InputField';
import axios from 'axios';
import './LoginForm.css';

const login = e => {
  e.preventDefault();
  axios.post('/auth/signup', {email: 'abc', password: '123'})
    .then(res => console.log('signed up, just reload'))
    .catch(e => console.log('error while signing up', e));
};

const LoginFormComp = () => (
  <form className="form-signin">
    <h3 className="form-signin-heading">Welcome to Nimble Quote</h3>
    <InputField id="username" label="Email" placeholder="Email" type="text"/>
    <InputField id="password" label="Password" placeholder="Password" type="password"/>
    <div className="form-group btns-wrapper">
      <button
        onClick={login}
        className="btn btn-lg btn-primary btn-block"
        name="Submit"
        value="Login"
        type="Submit"
      >
        Login
      </button>
    </div>
  </form>
);

export const LoginForm = reduxForm({
  form: 'LoginForm',
  destroyOnUnmount: true,
})(LoginFormComp);

