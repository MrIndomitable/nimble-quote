import React from 'react';
import {NewOfferTable} from '../NewOfferTable/NewOfferTable';
import axios from 'axios';
import {parse} from 'query-string';

export class OfferPage extends React.Component {
  state = {
    auction: null
  };

  componentWillMount() {
    const token = parse(this.props.location.search).t;
    const params = {
      token
    };
    axios.get('/api/offer', {params})
      .then(res => this.setState({auction: res.data}))
      .catch(e => console.error(e));
  }

  render() {
    const {auction} = this.state;

    if (auction) {
      return <div>
        <h2>Please insert your offer</h2>
        <NewOfferTable auction={auction}/>
      </div>
    }

    return <div>
      <h2>Auction not found</h2>
      <i className="fa fa-spinner fa-spin fa-5x fa-fw"/>
    </div>
  }
}
