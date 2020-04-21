import { useStoreActions } from 'easy-peasy';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from '../pages/Admin';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Products from '../pages/Products';
import NavbarComponent from './Navbar';
import PrivateRoute from './PrivateRoutes';
import ProductComponent from '../components/Product'

const App = () => {

  const getProducts = useStoreActions(action => action.products.getAllProducts)
  const admin = useStoreActions(actions => actions.admin.getCurrentAdmin);

  useEffect(() => {
    admin()
  }, [])

  return (
    <Router>
      <Fragment>
        <NavbarComponent />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:category" component={Products} />
          <Route exact path="/product/:productID" component={ProductComponent} />
          <Route exact path="/admin" component={Admin} />
          {/* <Route exact path="/register" component={Register} /> */}
          {/* <Route exact path="/products" component={Products} /> */}
          <PrivateRoute exact path="/register" component={Dashboard} />
          <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
