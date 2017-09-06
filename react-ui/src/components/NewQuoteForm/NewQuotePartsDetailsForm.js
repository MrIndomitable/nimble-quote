import React from 'react';
import {FieldArray, reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
import {DatePickerField} from '../form/DatePicker/DatePickerField';


const QuoteDetails = ({name}) => {
  return <div className="form-inline">
    <InputField id={`${name}.manufacture`} placeholder="Manufacture" type="text"/>
    <InputField id={`${name}.partNumber`} placeholder="Part #" type="text"/>
    <InputField id={`${name}.quantity`} placeholder="Quantity" type="number"/>
    <InputField id={`${name}.targetPrice`} placeholder="Target price" type="number"/>    
    <DatePickerField id={`${name}.partDate`} placeholder="Part date" type="date" />
    <DatePickerField id={`${name}.supplyDate`} placeholder="Supply date" type="date" />

  </div>
};

const renderQuotes = ({fields}) => {
  return <div>
    {fields.map((quote, i) => {
      return <div key={i}><QuoteDetails name={quote}/></div>
    })}
    <button className="btn btn-default" type="button" onClick={() => fields.push({})}>
      <span className="fa fa-plus"/> Add new
    </button>
  </div>
};

export const NewQuotePartsDetailsFormComp = ({handleSubmit}) => {
  return <form onSubmit={ handleSubmit }>
    <FieldArray name="details" component={renderQuotes}/>
    <button type="submit" className="btn btn-success btn-lg">
      Choose supplier's <span className="fa fa-caret-right"/>
    </button>
  </form>
};

export const NewQuotePartsDetailsForm = reduxForm({
  form: 'NewQuoteForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {details: [{}]}
})(NewQuotePartsDetailsFormComp);
