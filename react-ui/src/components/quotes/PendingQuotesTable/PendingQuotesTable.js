import React from 'react';
import {connect} from 'react-redux';
import {componentsSelector, isPending, hasOffers} from '../../../selectors/components-selector';
import {withRouter} from 'react-router';

const ComponentActions = (component) => {
  if (isPending(component)) {
    return (
      <button className="btn btn-danger btn-xs">
        cancel
      </button>
    );
  }

  if (hasOffers(component)) {
    return (
      <button
        className="btn btn-warning btn-xs"
      >
        Offers <span className="badge">{component.offers.length}</span>
      </button>
    );
  }
};

const ComponentRow = (component) => {
  const {partNumber, manufacture, quantity, targetPrice, date} = component;

  return (
    <tr>
      <td>{manufacture}</td>
      <td>{partNumber}</td>
      <td>{quantity}</td>
      <td>{targetPrice}</td>
      <td>{date}</td>
      <td><ComponentActions {...component}/></td>
    </tr>
  );
};

const ComponentsTableComp = ({components}) => (
  <table className="table table-striped">
    <thead>
    <tr>
      <th>Manufacture</th>
      <th>Part #</th>
      <th>Quantity</th>
      <th>Target price</th>
      <th>Date</th>
      <th/>
    </tr>
    </thead>
    <tbody>
    {components.map(component => <ComponentRow key={component.id} {...component}/>)}
    </tbody>
  </table>
);

const mapStateToProps = (state, {match}) => ({
  components: componentsSelector(state, match.params.filter)
});

export const ComponentsTable = withRouter(connect(mapStateToProps)(ComponentsTableComp));
