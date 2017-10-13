import React from 'react';
import {connect} from 'react-redux';
import {Field, change} from 'redux-form';
import {Creatable} from 'react-select';
import {addNewSupplier} from "../../actions/suppliers-actions";
import {formValueSelector} from 'redux-form'

import 'react-select/dist/react-select.css';

const SelectInput = (props) => (
  <Creatable
    {...props}
    value={props.input.value}
    onChange={(value) => props.input.onChange(value)}
    onBlur={() => props.input.onBlur(props.input.value)}
    options={props.options}
  />
);

class SuppliersInputComp extends React.Component {
  state = {
    newEmails: [] // TODO try to remove this, might come from store ???
  };

  createNewSupplier({value, label}) {
    const {newEmails} = this.state;
    const {addNewSupplier} = this.props;

    this.setState({newEmails: [...newEmails, {value, label}]});
    addNewSupplier(value).then(supplier => {
      const isNewEmail = this.state.newEmails.find(option => option.value === supplier.email);

      if (isNewEmail) {
        // filter the created email from state
        const newList = newEmails.filter(option => option.value !== supplier.email);
        this.setState({newEmails: newList});

        // update inout value to match supplier id
        this.props.updateNewEmail(supplier);
      }
    });
  };

  render() {
    const {newEmails} = this.state;
    const {suppliers, label, id} = this.props;
    const options = suppliers.map(({id, email}) => ({
      value: id, label: email
    }));

    const extendedOptions = [
      ...options,
      ...newEmails
    ];

    return (
      <div>
        {label && <label htmlFor={id}>{label}</label>}
        <Field
          name={id}
          options={extendedOptions}
          onNewOptionClick={option => this.createNewSupplier(option)}
          multi
          component={SelectInput}
        />
      </div>
    )
  }
}

const selector = formValueSelector('NewQuoteForm');

const mapStateToProps = (state, {id}) => {
  const suppliers = Object.values(state.suppliers);

  return ({
    suppliers,
    currentSuppliers: selector(state, id) || [],
    fieldId: id
  });
};

const mapDispatchToProps = {
  addNewSupplier,
  updateNewEmail: (currentSuppliers, fieldId) => dispatch => ({id, email}) => dispatch(
    change('NewQuoteForm', fieldId, [...currentSuppliers, {label: email, value: id}])
  )
};

const mergeProps = ({suppliers, currentSuppliers}, {addNewSupplier, updateNewEmail}, ownProps) => {
  return {
    ...ownProps,
    suppliers,
    addNewSupplier,
    updateNewEmail: updateNewEmail(currentSuppliers, ownProps.id)
  }
};

export const SuppliersInput = connect(mapStateToProps, mapDispatchToProps, mergeProps)(SuppliersInputComp);