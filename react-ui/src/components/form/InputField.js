import React from 'react';
import {Field} from 'redux-form';

const renderField = ({id, input, label, type, placeholder, className, meta: { touched, error, warning } }) => (
  <div>
      {label && <label htmlFor={id}>{label}</label>}
    <div>
      <input {...input} placeholder={placeholder} type={type} className={className}/>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}
    </div>
  </div>
)


export const InputField = ({id, label, type, placeholder, validate}) => {

  return (
    <div className="form-group">
      <Field
        id={id}
        className="form-control"
        name={id}
        component={renderField}
        type={type}
        placeholder={placeholder}
        label={label}
        validate={validate}
      />
    </div>
  )
};