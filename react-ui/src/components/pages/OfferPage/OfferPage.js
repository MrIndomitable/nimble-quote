import React from 'react';
import {Redirect} from 'react-router-dom';
import {NewOfferTable} from '../NewOfferTable/NewOfferTable';
import axios from 'axios';
import {parse} from 'query-string';
import { browserHistory } from 'react-router';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
export class OfferPage extends React.Component {
  state = {
    loading: true,
    submitting: false,
    submitted: false,
    hasErrors: false,
    auction: null
  };

  componentWillMount() {
    const token = parse(this.props.location.search).t;
    const params = {
      token
    };
    axios.get('/api/offer', {params})
      .then(res => this.setState({auction: res.data, loading: false}))
      .catch(e => console.error(e));
  }

  /* see Browser download file example in docs */
  s2ab(s/*:string*/)/*:ArrayBuffer*/ {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
  submitOffer(offerDetails, param) {
    

    this.setState({submitting: true});
    const token = parse(this.props.location.search).t;
    axios.post('/api/offer', {offerDetails, token})
      .then(() => this.setState({submitting: false, submitted: true}))
      .catch(e => this.setState({submitting: false, hasErrors: true}));
  };

  handleExport(offerDetails) {
    
    let keys = [], values=[];
    console.log(offerDetails);
    for(var key in offerDetails) {
      keys.push(key);
      values.push(offerDetails[key]);
    }
    let data = [];
    data.push(keys);
    data.push(values);
    console.log(data);
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

    const wbout = XLSX.write(wb, {type:"binary", bookType:"xlsx"});
    /* send to client */
    
    saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), "export.xlsx");
  };

  render() {
    return <div className="container">
      {this.getCurrentView()}
    </div>;
  }

  getCurrentView() {
    const {auction, loading, submitting, submitted, hasErrors} = this.state;

    if (loading) {
      return <i className="fa fa-spinner fa-spin fa-5x fa-fw"/>;
    }

    if (submitting) {
      return <div className="alert" role="alert">
        <h2>Submitting offer, please wait...</h2>
      </div>;
    }

    if (submitted) {
      return <div className="alert alert-success" role="alert">
        <h2>Your offer is being processed and viewed, thanks you!</h2>
      </div>;
    }

    if (hasErrors) {
      return <div className="alert alert-danger" role="alert">
        <span className="glyphicon glyphicon-exclamatio n-sign" aria-hidden="true"/>
        <span className="sr-only">Error:</span> An error occurred, please try again later
      </div>;
    }

    if (auction) {
      return <div>
        <h2>Please insert your offer</h2>
        <NewOfferTable auction={auction} submitOffer={offer => this.submitOffer(offer)} handleExport={offer => this.handleExport(offer)}/>
      </div>;
    }

    return <div className="alert alert-warning" role="alert">
      <h2>Auction not found</h2>
    </div>
  }
}
