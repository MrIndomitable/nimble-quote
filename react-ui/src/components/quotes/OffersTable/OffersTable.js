import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchQuotes} from '../../../actions/rfp-actions';

class OffersTableClass extends Component {
  componentWillMount() {
    this.props.fetchQuotes()
  }

  render() {
    return <OffersTableComp {...this.props}/>
  }
}

const OffersTableComp = ({quotes})=>{
    const offersRows = quotes.map(({id, partNumber, manufacture, quantity, targetPrice, date}) =>{
        return(
            <tr key={id}>
            <td>{manufacture}</td>
            <td>{partNumber}</td>
            <td>{quantity}</td>
            <td>{targetPrice}</td>
            <td>{date}</td>
            <td>
            <button className="btn btn-warning btn-raised btn-sm">Offers</button>
            </td>
        </tr>
        )
    });
    return (
        <table className="table table-striped">
        <thead>
        <tr>
            <th>Manufacture</th>
            <th>Part #</th>
            <th>Quantity</th>
            <th>Target price</th>
            <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {offersRows}
        </tbody>
        </table>
    );
} 

const mapStateToProps = state => ({
  quotes: state.quotes
});

const mapDispatchToProps = {
  fetchQuotes
};


export const OffersTable = connect(mapStateToProps, mapDispatchToProps)(OffersTableClass);
