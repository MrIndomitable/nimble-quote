import React from 'react';
import {Field} from 'redux-form';
import classnames from 'classnames';

const Help = ({touched, error, warning}) => {
  const className = error ? 'error' : 'warning';
  const text = error || warning;
  return touched && text ? <span className={className}>{text}</span> : null;
};

const inputClassName = (className, {touched, error}) => classnames(className, touched && {error});

const renderField = ({id, input, label, text, className, meta, ...props}) => (
  <div className="form-group">
    {label && <label htmlFor={id}>{label}</label>}
    <input
      {...input}
      {...props}
      className={inputClassName(className, meta)}
      value = {text}
    />
    <Help {...meta}/>
  </div>
);

export const InputField = ({id, label, value, ...props}) => (
  <Field
    id={id}
    className="form-control"
    name={id}
    component={renderField}
    label={label}
    {...props}
    value={value}
  />
);
