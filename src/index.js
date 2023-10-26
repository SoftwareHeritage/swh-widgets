import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: 'https:archive.softwareheritage.org/graphql/',
  // uri: 'http://127.0.0.1:8000/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          originSearch: relayStylePagination(),
          origins: relayStylePagination(),
        }
      },
      Directory: {
        fields: {
          entries: relayStylePagination(),
        }
      }
    }
  })
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
