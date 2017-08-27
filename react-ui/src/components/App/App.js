import React from 'react';
import {Header} from '../Header/Header';
import {NewRFPForm} from '../NewRFPForm/NewRFPForm';
import {NewQuotesTable} from '../quotes/NewQuotesTable/NewQuotesTable';
import './App.css';

const App = () => (
  <div className="App">
    <Header/>
    <div className="row" style={{margin: '20px', textAlign: 'left'}}>
      <div className="col-sm-4 well">
        <NewRFPForm/>
      </div>
      <div className="col-sm-8 well">
        <NewQuotesTable/>
      </div>
    </div>
  </div>
);

export default App;
