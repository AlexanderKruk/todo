import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    searchInput: '',
    filter: 'All'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((e) => e.id === id);
      
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName] };

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ]
  }

  onToggleImportant = (id) =>{
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "important") }
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "done") }
    });
  };

  searchItem = (searchInput) => {
    this.setState(() => {
        return { searchInput }
    })
  }

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newItem = [...todoData, this.createTodoItem(text)];
      return { todoData : newItem };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((e) => e.id === id);

      const newArray = [...todoData.slice(0, idx),
                        ...todoData.slice(idx + 1)];

      return {
        todoData: newArray
      }
    });
  };

  onChangeFilter = (filter) => {
    this.setState(() => {
      return { filter }
    })
  }

  filterItem(arr, searchFor, filter) {
    if(filter === 'All') {
    } else if(filter === 'Active') {
      arr = arr.filter((e) => !e.done);
    } else if (filter === 'Done') {
      arr = arr.filter((e) => e.done);
    }

    return arr.filter(e => e.label.toLowerCase().includes(searchFor.toLowerCase()));
  };

  render() {

    const { todoData, searchInput, filter } = this.state;
    const doneCount = todoData
                      .filter((e) => e.done).length;
    const todoCount = todoData
                      .filter((e) => !e.done).length;

    return(
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel searchItem = { this.searchItem } />
        <ItemStatusFilter onChangeFilter={ this.onChangeFilter } />
      </div>
      <TodoList 
        todos = { this.filterItem(todoData, searchInput, filter) }
        onDeleted = { this.deleteItem }
        onToggleImportant = { this.onToggleImportant }
        onToggleDone = { this.onToggleDone } />
      <ItemAddForm onAddItem = { this.addItem } />
  </div>
  )};
}