import React from 'react';
import {InputField} from '../form/InputField';
import {NewQuoteHOC} from './NewQuoteWizardConfig';

export const NewQuoteSupplierDetailsFormComp = ({handleSubmit, pristine, previousPage, submitting}) => {
  return <form onSubmit={ handleSubmit }>
    <InputField id="supplier" label="Supplier" type="email"/>
    <InputField id="subject" label="Subject" type="text"/>
    <InputField id="date" label="Date" type="text"/>
    <InputField id="message" label="Message" type="text"/>
    <button className="btn btn-default btn-lg" onClick={previousPage}>
      <span className="fa fa-caret-left"/> Back
    </button>
    <button type="submit" className="btn btn-success btn-lg" disabled={pristine || submitting}>
      Send Quote <span className="fa fa-caret-right"/>
    </button>
  </form>
};

export const NewQuoteSupplierDetailsForm = NewQuoteHOC(NewQuoteSupplierDetailsFormComp);
