import React, { Component } from 'react';

export default class ItemStatusFilter extends Component {

  state = {
    filter: 'All'
  };

  buttons = [
    { label: 'All' },
    { label: 'Active' },
    { label: 'Done' }
  ]

  onChangeFilter = (e) => {
    const filter = e.target.textContent;

    this.setState(() => {
      return { filter }
    });
    this.props.onChangeFilter(filter);
  };

  render() {

    const { filter } = this.state;

    const buttons = this.buttons.map((e) => {
      const isActive = filter === e.label
      const clazz = isActive ?  "btn btn-info" : "btn btn-outline-secondary";
      return (
        <button type="button"
        className={clazz}>{e.label}</button>
      )
    }) 

    return (
      <div className="btn-group" onClick={ this.onChangeFilter }>
        { buttons }
      </div>
    );
  }
}