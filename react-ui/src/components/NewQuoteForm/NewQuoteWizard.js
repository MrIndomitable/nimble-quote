import React, {Component} from 'react';
import {connect} from 'react-redux';
import {submitRFP} from '../../actions/rfp-actions';
import {NewQuotePartsDetailsForm} from './NewQuotePartsDetailsForm';
import {NewQuoteSupplierDetailsForm} from './NewQuoteSupplierDetailsForm';
import {Link} from 'react-router-dom';
import {fetchSuppliers} from "../../actions/suppliers-actions";
import classNames from 'classnames';

const ThanksPage = () =>{
  return <div className="po-thanks-page">
    Your quote was sent to selected supplier's!
    <br/>
    <Link className="btn btn-success" to={'/'}>Go Home > </Link>
  </div>
};
export class NewQuoteWizardComp extends Component {
  state = {
    page: 1
  };

  componentWillMount() {
    this.props.fetchSuppliers();
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const {page} = this.state;
    return (
      <div className="new-quote-wrapper">
        <h3>
        <a href="/"><i className="fa fa-arrow-circle-left" aria-hidden="true"></i>New Quote</a>
        </h3>
        <div className="progress">
          <div className="circle done">
            <span className="label">1</span>
            <span className="title">List Components</span>
            <span className="bar"></span>
          </div>
          <div className={classNames('circle', { done: page>=2 })}>
            <span className="label">2</span>
            <span className="title">Choose Supplier's</span>
            <span className="bar"></span>
          </div>
          <div className={classNames('circle', { done: page>=3 })}>
            <span className="label">3</span>
            <span className="title">Send Quote</span>
          </div>
        </div>
        {page === 1 && <NewQuotePartsDetailsForm onSubmit={() => this.nextPage()}/>}
        {page === 2 && <NewQuoteSupplierDetailsForm previousPage={() => this.previousPage()} onSubmit={values => {
          this.props.onSubmit(values);
          this.nextPage();
        }}/>}
        {page === 3 && <ThanksPage onSubmit={this.props.onSubmit}/>}
      </div>
    );
  }
}

const mapDispatchToProps = {
  onSubmit: submitRFP,
  fetchSuppliers
};

export const NewQuoteWizard = connect(null, mapDispatchToProps)(NewQuoteWizardComp);
