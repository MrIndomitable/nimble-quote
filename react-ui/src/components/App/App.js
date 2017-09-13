import React from 'react';
import {Route} from 'react-router';
import {Redirect} from 'react-router-dom';

import {Header} from '../Header/Header';
import {NewQuoteWizard} from '../NewQuoteForm/NewQuoteWizard';
import {PurchaseOrderWizard} from '../PurchaseOrderForm/PurchaseOrderWizard';
import {ComponentsPage} from '../quotes/ComponentsPage/ComponentsPage';
import {SingleComponent} from '../quotes/SingleComponent/SingleComponent';

const App = () => (
  <div className="App">
    <Header/>
    <Route exact path="/" render={() => <Redirect to="/components"/>}/>
    <Route path="/components/:filter?" component={ComponentsPage}/>
    <Route path="/single-component" component={SingleComponent}/>
    <Route path="/bom/create" component={NewQuoteWizard}/>
    <Route path="/purchase-order/create" component={PurchaseOrderWizard}/>
  </div>
);

export default App;