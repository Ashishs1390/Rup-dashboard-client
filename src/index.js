import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient,{ gql } from 'apollo-boost';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './vendor/@fortawesome/fontawesome-free/css/all.min.css';
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({
    addTypename: false
  })
});






  const Main = () => (
    <ApolloProvider client={client}>
      <App></App>
    </ApolloProvider>
  );
  
  render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
