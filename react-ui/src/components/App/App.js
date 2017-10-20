import React from 'react';
import {Route} from 'react-router';
import {Redirect} from 'react-router-dom';

import {Header} from '../Header/Header';
import {NewQuoteWizard} from '../NewQuoteForm/NewQuoteWizard';
import {PurchaseOrderWizard} from '../PurchaseOrderForm/PurchaseOrderWizard';
import {ComponentsPage} from '../quotes/ComponentsPage/ComponentsPage';
import {SingleComponent} from '../quotes/SingleComponent/SingleComponent';
import {OfferPage} from '../pages/OfferPage/OfferPage';
import {ProtectedRoute} from '../routes/ProtectedRoute';
import {Login} from '../routes/Login/Login';
import {Register} from '../routes/Register/Register';
import {ViewOrderPage} from '../pages/ViewOrderPage/ViewOrderPage';

const App = () => (
  <div className="App">
    <Header/>

    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/" render={() => <Redirect to="/components?q=pending"/>}/>
    <ProtectedRoute exact path="/components" component={ComponentsPage}/>
    <ProtectedRoute path="/components/:id" component={SingleComponent}/>
    <ProtectedRoute path="/bom/create" component={NewQuoteWizard}/>
    <ProtectedRoute path="/purchase-order/create" component={PurchaseOrderWizard}/>
    <Route path="/offer" component={OfferPage}/>
    <Route path="/view" component={ViewOrderPage}/>
  </div>
);

export default App;