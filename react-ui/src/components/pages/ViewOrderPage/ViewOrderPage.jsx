import React from 'react';
import {Invoice} from "../../Invoice/Invoice";
import {parse} from 'query-string';
import axios from 'axios';

export class ViewOrderPage extends React.Component {
  state = {
    order: null
  };

  componentWillMount() {
    const {order} = parse(this.props.location.search);
    axios.get(`/api/order/${order}`)
      .then(res => this.setState({order: res.data}))
      .catch(e => console.log(e));
  }

  render() {
    const {order} = this.state;

    if (order) {
      return <Invoice {...order}/>;
    }

    return <h3>No order found</h3>;
  }
}
