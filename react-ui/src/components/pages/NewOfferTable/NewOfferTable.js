import * as React from 'react';
import {InputField} from '../../form/InputField';
import {FieldArray, reduxForm} from 'redux-form';

const ComponentRow = ({name, manufacture, partNumber, targetPrice, quantity}) => {
  return <tr>
    <td>{manufacture}</td>
    <td>{partNumber}</td>
    <td>{targetPrice}</td>
    <td>{quantity}</td>
    <td><InputField id={`${name}.offerPrice`} type="number" placeholder="Offer price"/></td>
    <td><InputField id={`${name}.offerQuantity`} type="number" placeholder="Offer quantity"/></td>
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
  return <form onSubmit={handleSubmit}>
    <table className="table">
      <thead>
      <tr>
        <th>Manufacture</th>
        <th>Part #</th>
        <th>Target price</th>
        <th>Quantity</th>
        <th>Your offer price</th>
        <th>Your offer quantity</th>
      </tr>
      </thead>
      <FieldArray name="components" component={renderComponents}/>
    </table>
    <button className="btn btn-success btn-lg" type="submit">Submit your offer</button>
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
    const components = values.components
      .filter(component => !!component.offerPrice || !!component.offerQuantity)
      .map(component => {
        const {id, offerPrice, offerQuantity} = component;
        return {
          componentId: id,
          price: offerPrice,
          quantity: offerQuantity
        };
      });
    return {components};
  };

  return <NewOfferForm initialValues={toInitialValues(auction)} onSubmit={values => submitOffer(bla(values))}/>;
};
