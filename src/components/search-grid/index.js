import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from '../book';

class SearchGrid extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfs: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }
  render() {
    return (
      <div className="search-books-results">
        <ol className="books-grid" key="searchGrid">
        {this.props.books.map((book) => (
              <li key={book.id}>
                <Book key={book.id} shelfs={this.props.shelfs} book={book} updateBook={this.props.updateBook}/>
              </li>
            ))}
        </ol>
      </div>
    );
  }
}

export default SearchGrid;