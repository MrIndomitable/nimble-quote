import React from 'react';
import {connect} from 'react-redux';
import {Field} from 'redux-form';
import {Creatable} from 'react-select';
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

const addIdOrEmailProperties = options => {
  const newSupplier = (label, value) => ({
    label,
    value,
    email: label
  });

  const existingSupplier = (label, value) => ({
    label,
    value,
    id: value
  });

  return options.map(option => {
    const {label, value} = option;

    if (label === value) {
      return newSupplier(label, value);
    } else {
      return existingSupplier(label, value);
    }
  })
};

class SuppliersInputComp extends React.Component {
  state = {
    newEmails: [] // TODO try to remove this, might come from store ???
  };

  render() {
    const {newEmails} = this.state;
    const {suppliers, label, id, placeholder} = this.props;
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
          className="form-group"
          normalize={addIdOrEmailProperties}
          name={id}
          options={extendedOptions}
          autofocus
          placeholder={placeholder || ''}
          promptTextCreator={email => `Create new supplier ${email}`}
          multi
          component={SelectInput}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const suppliers = Object.values(state.suppliers);

  return ({
    suppliers,
  });
};

export const SuppliersInput = connect(mapStateToProps)(SuppliersInputComp);