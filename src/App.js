import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelfs from './components/bookshelfs';
import NotFound from './components/NotFound'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import Search from './components/search'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      // Can be moved to a service to support customer shelfs
      shelfs: [{ name: 'Currently Reading', option: 'currentlyReading' }, { name: 'Want to Read', option: 'wantToRead' }, { name: 'Read', option: 'read' }]
    }

  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((data) => this.setState({
      books: data,
      showSearchPage: false
    }));
  }

  updateBook = (bookToUpdate) => {
    let updatePro = BooksAPI.update(bookToUpdate, bookToUpdate.shelf);
    updatePro.then((data) => {
      BooksAPI.get(bookToUpdate.id).then((data) => {
        this.setState((state) => ({
          books: this.state.books.map((book) => {
            return book.id === bookToUpdate.id ? bookToUpdate : book
          })
        }));
      });
    });
    updatePro.catch((data) => {
      // TODO display error message
      console.log("update failed");
    })
  }

  searchBooks = (query) => {
    if (query !== '') {
      let searchPro = BooksAPI.search(query);
      searchPro.then((data) => {
        let allBooks = [...this.state.books, ...data]
        let uniquebooks = allBooks.reduce((x, y) => x.findIndex(e => (e.id === y.id)) < 0 ? [...x, y] : x, [])
        this.setState({
          books: uniquebooks,
          showSearchPage: true,
        });
      });
      searchPro.catch((data) => {
        // TODO add error handling
        console.log("search failed");
      })
    }
  }

  render() {
    return (
      <div className="app">
      <Switch>
        <Route
          path='/search'
          render={(props) =>(
              <Search updateShowSearchPageState={this.updateShowSearchPageState} books={this.state.books} updateBook={this.updateBook} searchBooks={this.searchBooks} shelfs={this.state.shelfs}/>
            )}
        />
        <Route
          exact path='/'
          render={(props) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelfs shelfs={this.state.shelfs} books={this.state.books} updateBook={this.updateBook} />
                </div>
              </div>
              <div className="open-search">
              <Link to="/search">Add a book</Link>
              {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
              </div>
            </div>
          )}
        />
        <Route
        path='/404'
        render={(props) =>(
          <NotFound/>
        )}/>
        <Redirect from='*' to='/404' />
      </Switch>
      </div>
    )
  }
}

export default BooksApp
