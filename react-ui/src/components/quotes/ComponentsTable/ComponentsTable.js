import React from 'react';
import {connect} from 'react-redux';
import {componentsSelector, isPending, hasOffers, isImminent} from '../../../selectors/components-selector';
import {withRouter} from 'react-router';
import {parse} from 'query-string';
import {goToComponent} from '../../../actions/rfp-actions';

const ComponentActions = ({component, openWithName}) => {
  const {name, offersCount } = component;
  if(name) {
    return (
      <a onClick={ name => openWithName(name) }>
        Summary
      </a>
    );
  }
  else {
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
          Offers <span className="badge">{offersCount}</span>
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
  }
  return null;
};

const ComponentRow = ({component, onClick}) => {
  const {name, partNumber, manufacture, quantity, targetPrice, date} = component;
  if(!name) {
    return (
      <tr className="component-row" onClick={onClick}>
        <td>{manufacture}</td>
        <td>{partNumber}</td>
        <td>{quantity}</td>
        <td>{targetPrice}</td>
        <td>{date}</td>
        <td><ComponentActions component = {component}/></td>
      </tr>
    );
  }
  else {
    return (
      <tr className="component-row">
        <td><button className="bom-category"> <span className="fa fa-plus"/> BOM</button> {name}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>{date}</td>
        <td><ComponentActions openWithName = { onClick } component = {component}  /></td>
      </tr>
    );
  }
};

const ComponentsTableComp = ({components, goToComponent}) => {
  const componentRows = components.map(component => {
   
    if(component.name) {
      return <ComponentRow key={component.id} component={component} onClick={(name) => goToComponent(component.id, component.name) }/>;
    }
    else {
      return <ComponentRow key={component.id} component={component} onClick={ () => goToComponent(component.id) }/>;
    }
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
  console.log('---------------------',location);
  const {q, search} = parse(location.search);
  let components = [];
  if(search) {
    components = componentsSelector(state, search);

  }
  else {
    components = componentsSelector(state, q);
    components.push({ name: 'Looking for these parts', date: '03-01-2018',id: 'testid1', id:'kkk' });
    components.push({ name: 'Looking for these parts', date: '03-01-2018',id: 'testid2', id: 'ddd' });
  }
  return ({
    components: components
  });
};

const mapDispatchToProps = {
  goToComponent
};

export const ComponentsTable = withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentsTableComp));
