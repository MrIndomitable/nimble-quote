import React from 'react';
import {FieldArray, reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
import {DatePickerField} from '../form/DatePicker/DatePickerField';
import { required, length, numericality } from 'redux-form-validators'
import XLSX from 'xlsx';
import FileReaderInput from 'react-file-reader-input';

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

class renderQuotes extends React.Component {
 
  
  constructor(props) {
    super(props);
    this.state = {excelData: [], cols: {}};
    this.importExcel = this.importExcel.bind(this);
    this.make_cols = this.make_cols.bind(this);
    this.onSelectColumn = this.onSelectColumn.bind(this);
  }
  onSelectColumn(col) {
    console.log(col);
  }
  importExcel(e, results) {
    
    const reader = new FileReader();
    const [event, file] = results[0];
      reader.onload = (e) => {
        /* Parse data */
        const bstr = event.target.result;
        const wb = XLSX.read(bstr, {type:'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {header:1});
        /* Update state */
        //this.setState({ data: data, cols: make_cols(ws['!ref']) });
        this.setState({excelData: data});
  
        //cols = make_cols(ws['!ref']);
      };

      reader.readAsBinaryString(file);
  }
  make_cols(refstr/*:string*/) {
    var o = [];
    var range = XLSX.utils.decode_range(refstr);
    for(var i = 0; i <= range.e.c; ++i) {
      o.push({name: XLSX.utils.encode_col(i), key:i});
    }
    return o;
  }
  render() {
    var Dropdown = require('react-simple-dropdown');
var DropdownTrigger = Dropdown.DropdownTrigger;
var DropdownContent = Dropdown.DropdownContent;
    return <div className="new-quote-fields-container">
      {this.state.excelData.map((quote, i, allRows) => {
        const {manufacture, partNumber, quantity, targetPrice} = allRows[i];
        console.log(allRows[i]);
        return <div key={i}>

          <QuoteDetails remove={() => this.state.excelData.remove(i)} name={quote} total={calculateTotalPrice({quantity, price: targetPrice})}/>
        </div>
      })}
      <button className="btn btn-default add-new-line" type="button" onClick={() => this.state.excelData.push({})}>
        <span className="fa fa-plus"/> Add new quote
      </button>
      
     
      <FileReaderInput as="binary" id="my-file-input"
                           onChange={this.importExcel}>
        <button className="btn btn-default add-new-line" type="button">
          <span className="fa fa-file-archive-o"/> Import BOM
        </button>
      </FileReaderInput>
      <hr/>
      <div className="excel-import-container">
        <table>
          <tr>
            <td>
              <Dropdown>
                <DropdownTrigger>Profile</DropdownTrigger>
                <DropdownContent>
                    <img src="avatar.jpg" /> Username
                    <ul>
                        <li>
                            <a href="/profile">Profile</a>
                        </li>
                        <li>
                            <a href="/favorites">Favorites</a>
                        </li>
                        <li>
                            <a href="/logout">Log Out</a>
                        </li>
                    </ul>
                </DropdownContent>
            </Dropdown>
            </td>
          </tr>
        </table>
      </div>
    </div>
  }
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

export const NewQuotePreviewFormComp = ({handleSubmit}) => {
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
