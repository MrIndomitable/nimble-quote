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
      <div>
        <h3>New Quote</h3>
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
