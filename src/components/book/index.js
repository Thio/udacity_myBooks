import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelfs: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { value: props.book.shelf || 'none' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const stateString = event.target.value;

    this.setState(
      { value: stateString }
    );

    let newBook = Object.assign({}, this.props.book);
    newBook.shelf = stateString;
    this.props.updateBook(newBook);
  }

  render() {
    const thumbnail = this.props.book.imageLinks ?
      this.props.book.imageLinks.thumbnail :
      'https://books.google.com/googlebooks/images/no_cover_thumb.gif';

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="move" disabled>Move to...</option>
              {this.props.shelfs.map((shelf) => (
                <option key={shelf.option} value={shelf.option}>{shelf.name}</option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(" & ") : 'no author'}</div>
      </div>
    );
  }
}

export default Book;