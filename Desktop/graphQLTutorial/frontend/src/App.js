import './App.css';
import React, { Component } from 'react'
import BookList from './components/BookList';
import {
  ApolloClient, ApolloProvider,
  InMemoryCache, HttpLink
} from '@apollo/client';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  link: new HttpLink({
     uri: 'http://localhost:6060/graphql'
  }),
  cache: new InMemoryCache()
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className='main'>
        <h1>BookList App</h1>
        <BookList/>
        <AddBook/>
      </div>
      </ApolloProvider>
    )
  }
}


export default App;
