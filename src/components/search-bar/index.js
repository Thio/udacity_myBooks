import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {DebounceInput} from 'react-debounce-input';

class SearchBar extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    updateQuery: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <DebounceInput
          minLength={2}
          debounceTimeout={500}
          type="text"
          onChange={event => this.props.updateQuery(event.target.value)}
          value={this.props.query}
          placeholder="Search by title or author"
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;