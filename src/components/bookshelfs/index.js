import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Bookshelf from '../bookshelf'

class Bookshelfs extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
    shelfs: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        {this.props.shelfs.map((shelf) =>
          <Bookshelf key={shelf.name}
          books={this.props.books.filter((book) => book.shelf === shelf.option).sort((a, b) => a.title > b.title)}
          shelf={shelf.name}
          shelfs={this.props.shelfs}
          updateBook={this.props.updateBook}/>
          )}
      </div>
    )
  }
};

export default Bookshelfs;