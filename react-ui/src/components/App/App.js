import React from 'react';
import {Route} from 'react-router';
import {Redirect} from 'react-router-dom';

import {Header} from '../Header/Header';
import {NewQuoteWizard} from '../NewQuoteForm/NewQuoteWizard';
import {PurchaseOrderWizard} from '../PurchaseOrderForm/PurchaseOrderWizard';
import {ComponentsPage} from '../quotes/ComponentsPage/ComponentsPage';
import {SingleComponent} from '../quotes/SingleComponent/SingleComponent';
import {OfferPage} from '../pages/OfferPage/OfferPage';

import {Login} from '../routes/Login/Login';
// import Auth from '../routes/Auth';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

const App = () => (
  <div className="App">
    <Header/>

    <Route exact path="/login" component={Login} />
    <Route exact path="/" render={() => <Redirect to="/components?q=pending"/>}/>
    <Route exact path="/components" component={ComponentsPage}/>
    <Route path="/components/:id" component={SingleComponent}/>
    <Route path="/bom/create" component={NewQuoteWizard}/>
    <Route path="/purchase-order/create" component={PurchaseOrderWizard}/>
    <Route path="/offer" component={OfferPage}/>
  </div>
);

export default App;