import React from 'react';
import {Invoice} from "../../Invoice/Invoice";
import {parse} from 'query-string';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './ViewOrderPage.css';

export class ViewOrderPage extends React.Component {
  state = {
    order: null
  };

  componentWillMount() {
    const {order} = parse(this.props.location.search);
    axios.get(`/api/order/${order}`)
      .then(res => this.setState({ order: res.data }))
      .catch(e => console.log(e));
  }

  render() {
    const {order} = this.state;

    if (order) {
      return <div className="container">
        <nav className="navbar navbar-light bg-light">
          <button className="btn btn-lg btn-primary pull-right" type="button">Acknowledge</button>
        </nav>
        <div className="invoice-container">
          <Invoice {...order}/>;
        </div>
        <nav className="navbar navbar-light bg-light">
          <button className="btn btn-lg btn-primary pull-right" type="button">Acknowledge</button>
        </nav>
      </div>
    }

    return <h3>No order found</h3>;
  }
}
