import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Field} from 'redux-form';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePickerField = ({id, placeholder}) => {
	const dateFormat = 'DD-MM-YYYY';

	const DatePickerFieldComp = ({input}) => {
		const handleChange = (date) => {
			input.onChange(moment(date).format(dateFormat))
		}
		return (
			<div className="form-group">
				<DatePicker
					{...input}
					placeholderText={placeholder}
					className="form-control"
					dateFormat={dateFormat}
					selected={input.value ? moment(input.value, dateFormat) : null}
					onChange={handleChange}
					label={placeholder}
					/>
			</div>
		)
	}
	return (
		<Field name={id} component={DatePickerFieldComp} />
	)
}
