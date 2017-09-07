import React from 'react';
import {Route} from 'react-router';
import {Redirect} from 'react-router-dom';

import {Header} from '../Header/Header';
import {NewQuoteWizard} from '../NewQuoteForm/NewQuoteWizard';
import {ComponentsPage} from '../quotes/ComponentsPage/ComponentsPage';

const App = () => (
  <div className="App">
    <Header/>
    <Route exact path="/" render={() => <Redirect to="/components"/>}/>
    <Route path="/components/:filter?" component={ComponentsPage}/>
    <Route path="/bom/create" component={NewQuoteWizard}/>
  </div>
);

export default App;
