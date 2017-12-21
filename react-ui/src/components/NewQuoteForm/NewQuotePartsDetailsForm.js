import React from 'react';
import {FieldArray, reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
import {DatePickerField} from '../form/DatePicker/DatePickerField';
import { required, length, numericality } from 'redux-form-validators'
import XLSX from 'xlsx';

const calculateTotalPrice = ({quantity, price}) => {
  return quantity && price ? quantity * price : 0;
};

const QuoteDetails = ({name, total,remove}) => {
  return <div className="form-inline">

    <a className="removeRowBtn" onClick={remove}><span className="glyphicon glyphicon-remove"></span></a> 

    <InputField autoFocus id={`${name}.manufacture`} placeholder="Manufacture" type="text" validate={[required(), length({ max: 50 })]} />
    <InputField id={`${name}.partNumber`} placeholder="Part #" type="text" validate={[required(), length({ max: 50 })]} />
    <InputField id={`${name}.quantity`} placeholder="Quantity" type="number" validate={[required(), length({ max: 50 }), numericality({ '>': 0 })]} />
    <InputField id={`${name}.targetPrice`} placeholder="Target price" type="number" validate={[required(), length({ max: 50 }), numericality({ '>': 0 })]} />
    <DatePickerField id={`${name}.supplyDate`} placeholder="Supply date" type="date" validate={[required()]} />
    <div className="form-group total-price">{total}</div>
<hr/>
  </div>
};

function importExcel() {
  var file = document.querySelector('input').files[0];
  const reader = new FileReader();
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {type:'binary'});
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {header:1});
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws['!ref']) });
    };
    reader.readAsBinaryString(file);
}
function make_cols(refstr/*:string*/) {
  var o = [];
  var range = XLSX.utils.decode_range(refstr);
  for(var i = 0; i <= range.e.c; ++i) {
    o.push({name: XLSX.utils.encode_col(i), key:i});
  }
  return o;
}
const renderQuotes = ({fields}) => {
  return <div className="new-quote-fields-container">
    {fields.map((quote, i, allRows) => {
      const {quantity, targetPrice} = allRows.get(i);
      return <div key={i}>

        <QuoteDetails remove={() => fields.remove(i)} name={quote} total={calculateTotalPrice({quantity, price: targetPrice})}/>
      </div>
    })}
    <button className="btn btn-default add-new-line" type="button" onClick={() => fields.push({})}>
      <span className="fa fa-plus"/> Add new quote
    </button>
    <button className="btn btn-default add-new-line" type="button" onClick={() => importExcel() }>
      <span className="fa fa-file-archive-o"/> Import BOM

    </button>
    <input type="file" />
    <hr/>
    <div className="excel-import-container">
    </div>
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
