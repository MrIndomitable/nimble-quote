import React from 'react';
import {FieldArray, reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
import {DatePickerField} from '../form/DatePicker/DatePickerField';
import * as v from '../form/Validation/Validation';


const QuoteDetails = ({name}) => {
  return <div className="form-inline">
    <InputField id={`${name}.manufacture`} placeholder="Manufacture" type="text" validate={[v.required]} />
    <InputField id={`${name}.partNumber`} placeholder="Part #" type="text"validate={[v.required]} />
    <InputField id={`${name}.quantity`} placeholder="Quantity" type="number"validate={[v.required]} />
    <InputField id={`${name}.targetPrice`} placeholder="Target price" type="number"validate={[v.required]} />    
    <DatePickerField id={`${name}.supplyDate`} placeholder="Supply date" type="date" validate={[v.required]} />
    <div className="form-group total-price">$12.00</div>
<hr/>
  </div>
};

const renderQuotes = ({fields}) => {
  return <div className="new-quote-fields-container">
    {fields.map((quote, i) => {
      return <div key={i}><QuoteDetails name={quote}/></div>
    })}
    <button className="btn btn-default add-new-line" type="button" onClick={() => fields.push({})}>
      <span className="fa fa-plus"/> Add new
    </button>
    <hr/>
  </div>
};

export const NewQuotePartsDetailsFormComp = ({handleSubmit}) => {
  return <form className="new-quote-form" onSubmit={ handleSubmit }>
  <div className="new-quote-form-headers">
    <div className="">Manufacture</div>
    <div className="">Part #</div>
    <div className="">Quantity</div>
    <div className="">Target price</div>
    <div className="">Supply date</div>
    <div className="">Total price</div>
  </div>
    <FieldArray name="details" component={renderQuotes}/>
    <button type="submit" className="btn btn-success btn-lg choose-supplier">
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
