import React from 'react';
// import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment';
import {Field} from 'redux-form';

 import 'react-datepicker/dist/react-datepicker.css' 



export const DatePickerField = ({id, placeholder}) => {
	
	const DatePickerFieldComp = ( {
      input,
      meta: {touched, error}
    }) =>{
    	const handleChange = (date) => {
		    input.onChange(moment(date).format('YYYY-MM-DD'))
		  }
		return (
          <div className="form-group">
	        <DatePicker
	          {...input}
	          placeholderText={placeholder}
	          className="form-control"
	          dateFormat="YYYY-MM-DD"
	          selected={input.value ? moment(input.value, 'YYYY-MM-DD') : null}
	          onChange={handleChange}
	          label={placeholder}
	        />
	        {touched && error && <span>{error}</span>}
	      </div>
    	)
	}
	return(
		<Field name={id} component={DatePickerFieldComp} />
	)
}
