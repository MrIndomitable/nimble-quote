import React from 'react';
import {Route} from 'react-router';
import {NavLink, Redirect} from 'react-router-dom';

import {Header} from '../Header/Header';
import {QuotesLifeCycle} from '../quotes/LifeCycle/LifeCycle';
import {PendingQuotesTable} from '../quotes/PendingQuotesTable/PendingQuotesTable';

const App = () => (
  <div className="App">
    <Header/>
    <Route exact path="/" render={() => <Redirect to="/quotes/pending"/>}/>
    <Route path="/quotes" component={QuotesLifeCycle}/>
    <Route path="/quotes/pending" component={PendingQuotesTable}/>
  </div>
);

export default App;
