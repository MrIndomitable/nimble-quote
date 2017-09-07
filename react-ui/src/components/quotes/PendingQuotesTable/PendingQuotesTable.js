import React from 'react';
import {connect} from 'react-redux';
import {componentsSelector} from '../../../selectors/components-selector';
import {withRouter} from 'react-router';

const ComponentRow = ({id, partNumber, manufacture, quantity, targetPrice, date}) => (
  <tr>
    <td>{manufacture}</td>
    <td>{partNumber}</td>
    <td>{quantity}</td>
    <td>{targetPrice}</td>
    <td>{date}</td>
    <td>
      <button className="btn btn-danger btn-raised btn-xs">cancel</button>
    </td>
  </tr>
);

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
