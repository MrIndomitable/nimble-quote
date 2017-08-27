import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchQuotes} from '../../../actions/rfp-actions';

class NewQuotesTableClass extends Component {
  componentWillMount() {
    this.props.fetchQuotes()
  }

  render() {
    return <NewQuotesTableComp {...this.props}/>
  }
}

const NewQuotesTableComp = ({quotes}) => {
  const quotesRows = quotes.map(({id, subject, partNumber, manufacture, date}) => {
    return (
      <tr key={id}>
        <td>{subject}</td>
        <td>{partNumber}</td>
        <td>{manufacture}</td>
        <td>{date}</td>
      </tr>
    )
  });
  return (
    <div>
      <h3>New Quotes</h3>
      <table className="table table-striped">
        <thead>
        <tr>
          <th>Subject</th>
          <th>Part #</th>
          <th>Manufacture</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {quotesRows}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => ({
  quotes: state.quotes
});

const mapDispatchToProps = {
  fetchQuotes
};

export const NewQuotesTable = connect(mapStateToProps, mapDispatchToProps)(NewQuotesTableClass);
