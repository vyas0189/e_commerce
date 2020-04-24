import { useStoreActions } from 'easy-peasy';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductComponent from '../components/Product';
import Cart from '../pages/Cart';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Products from '../pages/Products';
import AdminLogin from './Auth/Admin';
import Login from './Auth/User/Login';
import Register from './Auth/User/Register';
import Checkout from '../pages/Checkout';
import NavbarComponent from './Navbar';
import PrivateRoute from './PrivateRoutes';
import PrivateRouteAdmin from './PrivateRoutes/Admin';

const App = () => {

  const getProducts = useStoreActions(action => action.products.getAllProducts)
  const getUser = useStoreActions(actions => actions.user.getUser);

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Router>
      <Fragment>
        <NavbarComponent />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:category" component={Products} />
          <Route exact path="/product/:productID" component={ProductComponent} />
          <Route exact path="/admin" component={AdminLogin} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/checkout" component={Checkout} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRouteAdmin exact path="/dashboard" component={Dashboard} />
          <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
