import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {submitRFP} from '../../actions/rfp-actions';

const InputField = ({id, label, type}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <Field
        id={id}
        className="form-control"
        name={id}
        component="input"
        type={type}
      />
    </div>
  )
};

export const NewQuoteFormComp = ({handleSubmit, pristine, submitting}) => {
  return (
    <div>
      <h3>New Quote</h3>
      <form onSubmit={ handleSubmit }>
        <InputField id="supplier" label="Supplier" type="email"/>
        <InputField id="subject" label="Subject" type="text"/>
        <InputField id="date" label="Date" type="text"/>
        <InputField id="message" label="Message" type="text"/>
        <InputField id="manufacture" label="Manufacture" type="text"/>
        <InputField id="partNumber" label="Part #" type="text"/>
        <InputField id="quantity" label="Quantity" type="number"/>
        <InputField id="targetPrice" label="Target price" type="number"/>
        <InputField id="partDate" label="Part date" type="text"/>
        <InputField id="supplyDate" label="Supply date" type="text"/>
        <button type="submit" className="btn btn-default" disabled={pristine || submitting}>Submit</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  onSubmit: submitRFP
};

const FormHOC = reduxForm({form: 'newRFQ/RFP'});

export const NewQuoteForm = connect(null, mapDispatchToProps)(FormHOC(NewQuoteFormComp));