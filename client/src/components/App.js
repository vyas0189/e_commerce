import { useStoreActions } from 'easy-peasy';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../pages/Home';
import Products from '../pages/Products';
import NavbarComponent from './Navbar';

const App = () => {

  const getProducts = useStoreActions(action => action.products.getAllProducts)

  return (
    <Router>
      <Fragment>
        <NavbarComponent />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:category" component={Products} />
          {/* <Route exact path="/products/:productID" component={Product} /> */}
          {/* <Route exact path="/register" component={Register} /> */}
          {/* <Route exact path="/products" component={Products} /> */}
          <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
