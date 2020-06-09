import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import history from './history';

import {
  Home,
  ProductList,
  CreateProduct,
  ProductItem,
  SignIn,
  BrandList,
  CategoryList,
  NotFound,
  AttributeList,
  OrderList,
  OrderItem,
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
          <Route exact path="/catalog" component={ProductList} />
          <Route exact path="/catalog/:slug" component={ProductList} />
          <Route exact path="/products/new" component={CreateProduct} />
          <Route
            exact
            path="/products/new-variable"
            render={(props) => <CreateProduct {...props} variable />}
          />
          <Route exact path="/products/:slug" component={ProductItem} />
          <Route exact path="/products/:slug/edit" component={CreateProduct} />
          <Route
            exact
            path="/products/:slug/copy"
            render={(props) => <CreateProduct {...props} variable />}
          />
          <Route exact path="/brands" component={BrandList} />
          <Route exact path="/categories" component={CategoryList} />
          <Route exact path="/attributes" component={AttributeList} />
          <Route exact path="/orders" component={OrderList} />
          <Route exact path="/orders/:id" component={OrderItem} />
          <Route exact path="/login" component={SignIn} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
