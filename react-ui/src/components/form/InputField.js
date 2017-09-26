import React from 'react';
import {Field} from 'redux-form';

const renderField = ({ input, label, type, className, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className={className}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)


export const InputField = ({id, label, type, placeholder, validate}) => {

  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <Field
        id={id}
        className="form-control"
        name={id}
        component={renderField}
        type={type}
        placeholder={placeholder}
        label={placeholder}
        validate={validate}
      />
    </div>
  )
};