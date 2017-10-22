import React from 'react';
import {reduxForm} from 'redux-form';
import {InputField} from '../../form/InputField';
import './LoginForm.css';

const LoginFormComp = ({handleSubmit}) => (
  <form className="form-signin">
    <h3 className="form-signin-heading">Welcome to Nimble Quote</h3>
    <InputField id="email" label="Email" placeholder="Email" type="text"/>
    <InputField id="password" label="Password" placeholder="Password" type="password"/>
    <div className="form-group btns-wrapper">
      <button
        onClick={handleSubmit}
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
  form: 'LoginForm'
})(LoginFormComp);

