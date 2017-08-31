import React from 'react';
import {InputField} from '../form/InputField';
import {NewQuoteHOC} from './NewQuoteWizardConfig';

export const NewQuotePartsDetailsFormComp = ({handleSubmit}) => {
  return <form onSubmit={ handleSubmit }>
    <InputField id="manufacture" label="Manufacture" type="text"/>
    <InputField id="partNumber" label="Part #" type="text"/>
    <InputField id="quantity" label="Quantity" type="number"/>
    <InputField id="targetPrice" label="Target price" type="number"/>
    <InputField id="partDate" label="Part date" type="text"/>
    <InputField id="supplyDate" label="Supply date" type="text"/>
    <button type="submit" className="btn btn-success btn-lg">
      Choose supplier's <span className="fa fa-caret-right"/>
    </button>
  </form>
};

export const NewQuotePartsDetailsForm = NewQuoteHOC(NewQuotePartsDetailsFormComp);
