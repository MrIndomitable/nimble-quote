import React from 'react';
import {FieldArray, reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
import {DatePickerField} from '../form/DatePicker/DatePickerField';
import { required, length, numericality } from 'redux-form-validators'


const calculateTotalPrice = ({quantity, price}) => {
  return quantity && price ? quantity * price : 0;
};

const QuoteDetails = ({name, total}) => {
  return <div className="form-inline">
    <InputField autoFocus id={`${name}.manufacture`} placeholder="Manufacture" type="text" validate={[required(), length({ max: 50 })]} />
    <InputField id={`${name}.partNumber`} placeholder="Part #" type="text" validate={[required(), length({ max: 50 })]} />
    <InputField id={`${name}.quantity`} placeholder="Quantity" type="number" validate={[required(), length({ max: 50 }), numericality({ '>': 0 })]} />
    <InputField id={`${name}.targetPrice`} placeholder="Target price" type="number" validate={[required(), length({ max: 50 }), numericality({ '>': 0 })]} />
    <DatePickerField id={`${name}.supplyDate`} placeholder="Supply date" type="date" validate={[required()]} />
    <div className="form-group total-price">{total}</div>
<hr/>
  </div>
};

const renderQuotes = ({fields}) => {
  return <div className="new-quote-fields-container">
    {fields.map((quote, i, allRows) => {
      const {quantity, targetPrice} = allRows.get(i);
      return <div key={i}>
        <QuoteDetails name={quote} total={calculateTotalPrice({quantity, price: targetPrice})}/>
      </div>
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
