import * as React from 'react';
import {InputField} from '../../form/InputField';
import {FieldArray, reduxForm} from 'redux-form';
import {DatePickerField} from "../../form/DatePicker/DatePickerField";
import moment from 'moment';
import { required, numericality } from 'redux-form-validators'


const DATE_FORMAT = 'DD-MM-YYYY';

const ComponentRow = ({name, manufacture, partNumber, targetPrice, quantity}) => {
  return <tr>
    <td>{manufacture}</td>
    <td>{partNumber}</td>
    <td>{targetPrice}</td>
    <td>{quantity}</td>
    <td><InputField id={`${name}.offerPrice`} type="number" placeholder="Offer price" validate={[required(), numericality({ '>': 0 })]}/></td>
    <td><InputField id={`${name}.offerQuantity`} type="number" placeholder="Offer quantity" validate={[required(), numericality({ '>': 0 })]}/></td>
    <td><DatePickerField id={`${name}.partDate`} placeholder="Part date" type="date" dateFormat={DATE_FORMAT} validate={required()} /></td>
    <td><DatePickerField id={`${name}.supplyDate`} placeholder="Supply date" type="date" dateFormat={DATE_FORMAT} validate={required()}/></td>
  </tr>
};

const renderComponents = ({fields}) => {
  return <tbody>
  {fields.map((name, i, components) => {
    const component = components.get(i);
    return <ComponentRow key={component.id} name={name} {...component}/>
  })}
  </tbody>
};

export const NewOfferTableComp = ({handleSubmit}) => {
  return <form className="new-offer-form" onSubmit={handleSubmit}>
    <table className="table">
      <thead>
      <tr>
        <th>Manufacture</th>
        <th>Part #</th>
        <th>Target price</th>
        <th>Quantity</th>
        <th>Your offer price</th>
        <th>Your offer quantity</th>
        <th>Part date</th>
        <th>Supply date</th>
      </tr>
      </thead>
      <FieldArray name="components" component={renderComponents}/>
    </table>
    <button className="btn btn-success btn-lg submit-offer" type="submit">Submit your offer</button>
  </form>
};

const NewOfferForm = reduxForm({
  form: 'NewOffer'
})(NewOfferTableComp);

export const NewOfferTable = ({auction, submitOffer}) => {
  const toInitialValues = (auction) => ({
    components: auction.bom.components
  });

  const bla = values => {
    const nonEmptyOffer = component => !!component.offerPrice || !!component.offerQuantity;

    const components = values.components
      .filter(nonEmptyOffer)
      .map(component => {
        const {id, offerPrice, offerQuantity, supplyDate, partDate} = component;
        return {
          componentId: id,
          price: offerPrice,
          quantity: offerQuantity,
          supplyDate: moment(supplyDate, DATE_FORMAT).valueOf(),
          partDate: moment(partDate, DATE_FORMAT).valueOf()
        };
      });
    return {components};
  };

  return <NewOfferForm
    initialValues={toInitialValues(auction)}
    onSubmit={values => submitOffer(bla(values))}
  />;
};
