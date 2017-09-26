import React from 'react';
import {connect} from 'react-redux';
import {findComponentById} from '../../../selectors/components-selector';
import {withRouter} from 'react-router';
import {fetchComponent} from '../../../actions/components-actions';

const LabelAndValue = ({label, value}) => (
  <div className="col-lg-2 ">
    <p>{label}</p>
    <p className=""><strong>{value}</strong></p>
  </div>
);

class ComponentDetailsWrapper extends React.Component {
  componentWillMount() {
    const {component, id, fetchComponent} = this.props;

    if (!component) {
      fetchComponent(id);
    }
  }

  render() {
    const {component} = this.props;

    if (!component) {
      return <i className="fa fa-spinner fa-spin fa-5x fa-fw"/>;
    }

    return <ComponentDetailsComp component={component}/>;
  }
}

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

  return {component, id}
};

const mapDispatchToProps = {
  fetchComponent
};

export const ComponentDetails = withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentDetailsWrapper));