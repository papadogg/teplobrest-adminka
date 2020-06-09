import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

import App from './App';
import { endPoint } from './config';

import 'semantic-ui-css/semantic.min.css';
import './index.scss';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const cache = new InMemoryCache({
  dataIdFromObject: (o) => (o._id ? `${o.__typename}:${o._id}` : null),
});
const httpLink = new HttpLink({
  uri: `${endPoint}graphql`,
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  // clientState: {
  //   resolvers: {},
  // },
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
