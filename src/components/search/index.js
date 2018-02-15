import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchGrid from '../search-grid';
import SearchBar from '../search-bar';


class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
    searchBooks: PropTypes.func.isRequired,
    shelfs: PropTypes.array.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    this.props.searchBooks(query.trim());
  }

  render() {
    const regexp = new RegExp(this.state.query, 'i');

    //requirement i have to comply to although i wanted to show all previously searched books if query is empty
    const filteredBooks = this.state.query ?
    this.props.books.filter((book) =>
      regexp.test(book.title) || regexp.test(book.author)
    ).sort((a, b) => a.title > b.title)
    : [];

    return (
      <div className="search-books">
        <SearchBar query={this.state.query} updateQuery={this.updateQuery} />
        <SearchGrid shelfs={this.props.shelfs} books={filteredBooks} updateBook={this.props.updateBook} />
      </div>
    );
  }
}

export default Search;