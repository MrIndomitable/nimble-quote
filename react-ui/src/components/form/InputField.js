import React from 'react';
import {Field} from 'redux-form';

export const InputField = ({id, label, type, placeholder}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <Field
        id={id}
        className="form-control"
        name={id}
        component="input"
        type={type}
        placeholder={placeholder}
        label={placeholder}
      />
    </div>
  )
};