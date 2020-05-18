import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import history from './history';

import {
  Home,
  ProductList,
  NewProduct,
  ProductItem,
  SignIn,
} from './components';
import { GET_USER } from './query';

const App = () => {
  const token = localStorage.getItem('token');

  const { data, error, loading } = useQuery(GET_USER, {
    variables: {
      token,
    },
    skip: !token,
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error || !data) {
    history.push('/login');
  }

  if (!error && data) {
    const { role } = data.getUserByToken;
    if (role !== 'admin') {
      return <div>Access denied</div>;
    }
  }

  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/products/new" component={NewProduct} />
          <Route exact path="/products/:id" component={ProductItem} />
          <Route exact path="/login" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
