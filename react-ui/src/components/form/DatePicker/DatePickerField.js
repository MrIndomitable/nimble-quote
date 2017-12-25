import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Field} from 'redux-form';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';


const DatePickerFieldComp = ({className, input, placeholder, value, showYearDropdown, dateFormat = 'DD-MM-YYYY', meta: { touched, error, warning }, validate}) => {
  const handleChange = (date) => {
    input.onChange(moment(date).format(dateFormat))
  };

  return (
    <div className="form-group">
      <DatePicker
        {...input}
        showYearDropdown={true}
        placeholderText={placeholder}
        className={classNames(className, touched && {error})}
        dateFormat={dateFormat}
        selected={input.value ? moment(input.value, dateFormat) : null}
        onChange={handleChange}
        label={placeholder}
        validate={validate}
        value = {value}
        />
      { touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>)) }
    </div>
  )
};

export const DatePickerField = ({id, value, ...props}) => {
  return (
    <Field
      name={id}
      value ={value}
      component={DatePickerFieldComp}
      className="form-control"
      {...props}
      />
  );
};
