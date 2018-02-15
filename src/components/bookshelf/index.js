import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Book from '../book';

class Bookshelf extends Component {
  static propTypes= {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    shelfs: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.id}>
                <Book book={book} shelfs={this.props.shelfs} updateBook={this.props.updateBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;