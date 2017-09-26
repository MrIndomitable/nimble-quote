import React from 'react';
import {connect} from 'react-redux';
import {findComponentById} from '../../../selectors/components-selector';
import {withRouter} from 'react-router';

const LabelAndValue = ({label, value}) => (
  <div className="col-lg-2 ">
    <p>{label}</p>
    <p className=""><strong>{value}</strong></p>
  </div>
);

const ComponentDetailsComp = ({component}) => {
  const {manufacture, partNumber, quantity, targetPrice, partDate} = component;
  return <div className="text-center">
    <LabelAndValue label="Manufacture" value={manufacture}/>
    <LabelAndValue label="Part No." value={partNumber}/>
    <LabelAndValue label="Quantity" value={quantity}/>
    <LabelAndValue label="Target price" value={targetPrice}/>
    <LabelAndValue label="Part date" value={partDate}/>
    <div className="col-lg-2">
      <br/>
      <button className="btn">Archive</button>
    </div>
  </div>;
};

const mapStateToProps = (state, {match}) => {
  const {id} = match.params;

  const component = findComponentById(state, id);

  return {component}
};

export const ComponentDetails = withRouter(connect(mapStateToProps)(ComponentDetailsComp));