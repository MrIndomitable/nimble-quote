import React from 'react';
import {Header} from '../Header/Header';
import {NewRFPForm} from '../NewRFPForm/NewRFPForm';
import './App.css';

const App = () => (
  <div className="App">
    <Header/>
    <div className="row" style={{margin: '20px'}}>
      <div className="col-sm-4 well" style={{textAlign: 'left'}}>
        <NewRFPForm onSubmit={values => console.log(values)}/>
      </div>
    </div>
  </div>
);

export default App;
