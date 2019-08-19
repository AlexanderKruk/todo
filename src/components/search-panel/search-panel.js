import React, { Component } from 'react';
import './search-panel.css'

export default class SearchPanel extends Component {

  state = {
    searchInput: ''
  };

  searchItem = (e) => {
    const searchInput = e.target.value;
    this.setState(() => {
      return { searchInput }
    })
    this.props.searchItem(searchInput);
  };

  render() {
    return <input type="text"
    className="form-control search-input"
    placeholder="type to search"
    onChange={ this.searchItem }
    value={ this.state.searchInput } />;
  }
}