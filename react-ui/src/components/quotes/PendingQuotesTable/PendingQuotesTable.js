import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAuctions} from '../../../actions/rfp-actions';
import {componentsSelector} from '../../../selectors/components-selector';

class ComponentsTableClass extends Component {
  componentWillMount() {
    this.props.fetchAuctions()
  }

  render() {
    return <ComponentsTableComp {...this.props}/>
  }
}

const ComponentsTableComp = ({components}) => {
  const ComponentRow = ({id, partNumber, manufacture, quantity, targetPrice, date}) => (
    <tr key={id}>
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

  return (
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
      {components.map(component => <ComponentRow {...component}/>)}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  components: componentsSelector(state)
});

const mapDispatchToProps = {
  fetchAuctions
};

export const ComponentsTable = connect(mapStateToProps, mapDispatchToProps)(ComponentsTableClass);
