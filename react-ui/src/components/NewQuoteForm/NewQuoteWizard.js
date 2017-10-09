import React, {Component} from 'react';
import {connect} from 'react-redux';
import {submitRFP} from '../../actions/rfp-actions';
import {NewQuotePartsDetailsForm} from './NewQuotePartsDetailsForm';
import {NewQuoteSupplierDetailsForm} from './NewQuoteSupplierDetailsForm';

export class NewQuoteWizardComp extends Component {
  state = {
    page: 1
  };

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
        {page === 1 && <NewQuotePartsDetailsForm onSubmit={() => this.nextPage()}/>}
        {page === 2 && <NewQuoteSupplierDetailsForm previousPage={() => this.previousPage()} onSubmit={this.props.onSubmit}/>}
      </div>
    );
  }
}

const mapDispatchToProps = {
  onSubmit: submitRFP
};

export const NewQuoteWizard = connect(null, mapDispatchToProps)(NewQuoteWizardComp);
