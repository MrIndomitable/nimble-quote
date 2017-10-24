import React from 'react';
import {Invoice} from "../../Invoice/Invoice";
import {parse} from 'query-string';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './ViewOrderPage.css';

const Alert = ({submitted, hasErrors}) => {
  if (submitted) {
    return <div className="invoice-container">
      <div className="alert alert-success" role="alert">
        <h2>Your Approveing PO is being processed and viewed, thanks you!</h2>
      </div>
    </div>
  }
  if (hasErrors) {
    return <div className="invoice-container">
      <div className="alert alert-danger" role="alert">
        <h2>Ther is a problem during Approveing PO!</h2>
      </div>
    </div>
  }
  return null

}



export class ViewOrderPage extends React.Component {
  state = {
    order: null,
    submitted: false,
    hasErrors: false
  };

  componentWillMount() {
    const {order} = parse(this.props.location.search);
    axios.get(`/api/order/${order}`)
      .then(res => this.setState({ order: res.data }))
      .catch(e => console.log(e));
  }

  render() {
    console.log(this.state);
    const {order} = this.state;
    const {submitted, hasErrors} = this.state;

    const acknowledge = () => {
      axios.post(`/api/acknowledge`, { token: order })
        .then(() => this.setState({ submitted: true }))
        .catch(e => this.setState({ hasErrors: true }));
      // .then(res => console.log({ order: res.data }))
      // .catch(e => console.log(e));
    }
    const AcknowledgeButton = ({acknowledge}) => {
      return <nav className="navbar navbar-light bg-light">
        <button className="btn btn-lg btn-primary pull-right" type="button" onClick={acknowledge} >Acknowledge</button>
      </nav>
    }
    if (order) {
      return <div className="container">

        <AcknowledgeButton acknowledge={acknowledge}/>
        <Alert {...this.state}/>
        <div className="invoice-container">
          <Invoice {...order}/>;
        </div>
        <AcknowledgeButton acknowledge={acknowledge}/>
      </div>
    }


    return <h3>No order found</h3>;
  }
}
