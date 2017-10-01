import React from 'react';
import {connect} from 'react-redux';
import {componentsSelector, isPending, hasOffers, isImminent} from '../../../selectors/components-selector';
import {withRouter} from 'react-router';
import {parse} from 'query-string';
import {goToComponent} from '../../../actions/rfp-actions';

const ComponentActions = (component) => {
  if (isPending(component)) {
    return (
      <button className="btn btn-default btn-xs">
        cancel
      </button>
    );
  }

  if (hasOffers(component)) {
    return (
      <button
        className="btn btn-warning btn-xs"
      >
        Offers <span className="badge">{component.offersCount}</span>
      </button>
    );
  }

  if (isImminent(component)) {
    return (
      <button
        className="btn btn-primary btn-xs"
      >
        View purchase order <span className="fa fa-eye"/>
      </button>
    );
  }

  return null;
};

const ComponentRow = ({component, onClick}) => {
  const {partNumber, manufacture, quantity, targetPrice, date} = component;

  return (
    <tr className="component-row" onClick={onClick}>
      <td>{manufacture}</td>
      <td>{partNumber}</td>
      <td>{quantity}</td>
      <td>{targetPrice}</td>
      <td>{date}</td>
      <td><ComponentActions {...component}/></td>
    </tr>
  );
};

const ComponentsTableComp = ({components, goToComponent}) => {
  const componentRows = components.map(component => {
    return <ComponentRow key={component.id} component={component} onClick={() => goToComponent(component.id) }/>;
  });

  return (
    <div className="table-container">
      <table className="table table-striped table-hover">
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
        {componentRows}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state, {location}) => {
  const {q} = parse(location.search);
  return ({
    components: componentsSelector(state, q)
  });
};

const mapDispatchToProps = {
  goToComponent
};

export const ComponentsTable = withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentsTableComp));
