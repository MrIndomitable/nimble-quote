import React from 'react';
import {reduxForm} from 'redux-form';
import {InputField} from '../../form/InputField';
import './register.css';
import * as v from '../../form/Validation/Validation';

const RegisterFormComp = ({handleSubmit}) => (
  <form className="form-signup">
    <h3 className="form-signup-heading">Welcome to Nimble Quote</h3>
    <InputField id="email" label="Email" placeholder="Email" type="text" validate={[v.required]}/>
    <InputField id="password" label="Password" placeholder="Password" type="password" validate={[v.required]}/>
    <InputField id="confirm-password" label="Confirm Password" placeholder="Confirm Password" type="password" validate={[v.required]}/>
    <div className="form-group btns-wrapper">
      <button
        onClick={handleSubmit}
        className="btn btn-lg btn-primary btn-block"
        name="Submit"
        value="SignUp"
        type="Submit"
      >
        SignUp
      </button>
    </div>
  </form>
);

export const RegisterForm = reduxForm({
  form: 'RegisterForm'
})(RegisterFormComp);