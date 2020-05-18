import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

import './index.scss';
import App from './App';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/api',
});

const client = new ApolloClient({
  cache,
  link,
  clientState: {
    resolvers: {},
  },
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token') || '',
      },
    });
  },
});

cache.writeData({
  data: {
    // cartItems: []
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
