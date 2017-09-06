import React from 'react';
import {Route} from 'react-router';
import {Redirect} from 'react-router-dom';

import {Header} from '../Header/Header';
import {QuotesLifeCycle} from '../quotes/LifeCycle/LifeCycle';
import {NewQuoteWizard} from '../NewQuoteForm/NewQuoteWizard';
import {PendingQuotesTable} from '../quotes/PendingQuotesTable/PendingQuotesTable';
import {OffersTable} from '../quotes/OffersTable/OffersTable';
import {ImminentQuotesTable} from '../quotes/ImminentQuotesTable/ImminentQuotesTable';

const App = () => (
  <div className="App">
    <Header/>
    <Route exact path="/" render={() => <Redirect to="/quotes/pending"/>}/>
    <Route path="/quotes" component={QuotesLifeCycle}/>
    <Route path="/quotes/pending" component={PendingQuotesTable}/>
    <Route path="/quotes/create" component={NewQuoteWizard}/>
    <Route path="/quotes/offers" component={OffersTable}/>
    <Route path="/quotes/imminent" component={ImminentQuotesTable}/>
  </div>
);

export default App;
