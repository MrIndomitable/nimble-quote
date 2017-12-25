import React from 'react';
import {FieldArray, reduxForm} from 'redux-form';
import {InputField} from '../form/InputField';
import {DatePickerField} from '../form/DatePicker/DatePickerField';
import { required, length, numericality } from 'redux-form-validators';
import XLSX from 'xlsx';
import FileReaderInput from 'react-file-reader-input';
import DropDownMenu from '../DropDownMenu';

const calculateTotalPrice = ({quantity, price}) => {
  return quantity && price ? quantity * price : 0;
};

class QuoteDetails extends React.Component {
  constructor(props) {
    super(props);
    const {name, order, remove, total} = this.props;
    this.updateData = this.updateData.bind(this);
    this.state = ({manufacture: name[order[0]], partNumber: this.props.name[order[1]], quantity: this.props.name[order[2]], targetPrice: this.props.name[order[3]], supplyDate: this.props.name[order[4]]});
     console.log('first row', name[order[0]]);
  }
  updateData (evt, col) {
    switch(col) {
      case 0:
        this.setState({
          manufacture: evt.target.value
        });

        break;
      case 1:
        break;
    }
  }
  render() {
    const {name, order, remove, total} = this.props;
    const { manufacture, partNumber } = this.state;
    return <div className="form-inline">
      <a className="removeRowBtn" onClick={this.props.remove}><span className="glyphicon glyphicon-remove"></span></a> 
      <InputField autoFocus id={`${name[order[0]]}.manufacture`} text={manufacture} placeholder={`${name[order[0]]}`} type="text" validate={[required(), length({ max: 50 })]} onChange={ evt => this.updateData(evt, 0) }/>
      <InputField text={partNumber} id={`${name[order[1]]}`}  placeholder={`${name[order[1]]}`} type="text" validate={[required(), length({ max: 50 })]} />
      <InputField id={`${name[order[2]]}`} text={`${name[order[2]]}`} placeholder={`${name[order[2]]}`} type="number" validate={[required(), length({ max: 50 }), numericality({ '>': 0 })]} />
      <InputField id={`${name[order[3]]}`} text={`${name[order[3]]}`} placeholder={`${name[order[3]]}`} type="number" validate={[required(), length({ max: 50 }), numericality({ '>': 0 })]} />
      <DatePickerField id={`${name[order[4]]}`} text={`${name[order[4]]}`} placeholder="Supply date" type="date" validate={[required()]} />
      <div className="form-group total-price">{total}</div>
      <hr/>
    </div>
  }
};

class renderQuotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {excelData: [{}], cols: [], showPopup: false, selectedColumns: [] };
    this.importExcel = this.importExcel.bind(this);
    this.make_cols = this.make_cols.bind(this);
    this.onSelectColumn = this.onSelectColumn.bind(this);
    this.pushRow = this.pushRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  loadData() {
    this.setState({ showPopup: false });
  }
  onSelectColumn(item, col) {
    let columns = this.state.selectedColumns;
    columns[col] = item;
    this.setState({ selectedColumns: columns });
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
        this.setState({ excelData: data, cols: this.make_cols(ws['!ref']), showPopup: true });
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
  pushRow() {
    let rowData = this.state.excelData;
    rowData.push({});
    this.setState({ excelData: rowData });
  }
  removeRow(i) {
    let rowData = this.state.excelData;
    rowData.remove(i);
    this.setState({ excelData: rowData });
  }
  render() {
    let titleRow = (this.state.excelData)[0];
    return <div className="new-quote-fields-container">
      {this.state.excelData.map((quote, i, allRows) => {
        console.log(quote);        
        const {manufacture, partNumber, quantity, targetPrice} = allRows[i];
        return <div key={i}>

          <QuoteDetails remove={() => this.removeRow(i)} name={quote} total="3" order={this.state.selectedColumns} />
        </div>
      })}
      <button className="btn btn-default add-new-line" type="button" onClick={this.pushRow}>
        <span className="fa fa-plus"/> Add new quote
      </button>
      
     
      <FileReaderInput as="binary" id="my-file-input"
                           onChange={this.importExcel}>
        <button className="btn btn-default add-new-line" type="button">
          <span className="fa fa-file-archive-o"/> Import BOM
        </button>
      </FileReaderInput>
      <hr/>
      {
        this.state.showPopup ? (
        <div className="excel-import-container">
          <div className="import-inner">
            <table>
              <tbody>
                <tr>
                  <td>
                    <DropDownMenu list={titleRow} ref="dropdown" onClick={ item => this.onSelectColumn(item, 0) }>
                      <div className="dropdown-button" onClick={ () => this.refs.dropdown.onOpen() }>
                         <div> Part No</div>
                         <span>{ titleRow[this.state.selectedColumns[0]] }</span>
                         <i className="material-icons">arrow_drop_down</i>
                      </div>
                    </DropDownMenu>
                  </td>
                  <td>
                    <DropDownMenu list={titleRow} ref="dropdown2" onClick={ item => this.onSelectColumn(item, 1) }>
                      <div className="dropdown-button" onClick={ () => this.refs.dropdown2.onOpen() }>
                         <div>Manufacturer</div>
                         <span>{ titleRow[this.state.selectedColumns[1]] }</span>
                         <i className="material-icons">arrow_drop_down</i>
                      </div>
                    </DropDownMenu>
                  </td>
                  <td>
                    <DropDownMenu list={titleRow} ref="dropdown3" onClick={ item => this.onSelectColumn(item, 2) }>
                      <div className="dropdown-button" onClick={ () => this.refs.dropdown3.onOpen() }>
                        <div>Target Price</div>
                        <span>{ titleRow[this.state.selectedColumns[2]] }</span>
                        <i className="material-icons">arrow_drop_down</i>
                      </div>
                    </DropDownMenu>
                  </td>
                  <td>
                    <DropDownMenu list={titleRow} ref="dropdown4" onClick={ item => this.onSelectColumn(item, 3 ) }>
                      <div className="dropdown-button" onClick={ () => this.refs.dropdown4.onOpen() }>
                        <div>Part Date</div>
                        <span>{ titleRow[this.state.selectedColumns[3]] }</span>
                        <i className="material-icons">arrow_drop_down</i>
                      </div>
                    </DropDownMenu>
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="load-data" onClick={this.loadData}>Load Data</button>
          </div>
        </div>
        ) : ('')
      }
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
