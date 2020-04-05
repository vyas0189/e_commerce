import axios from 'axios';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../pages/Home';
import Navbar from './Navbar';

const App = () => {

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/product');
      console.log(res.data);

    })()
  }, [])
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/login" component={Login} /> */}
          {/* <Route exact path="/register" component={Register} /> */}
          {/* <Route exact path="/products" component={Products} /> */}
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
