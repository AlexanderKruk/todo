import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted,
                    onToggleImportant,
                    onToggleDone }) => {

  const elements = todos.map((e) => {

    const { id, ...itemProps } = e;

    return (
      <li key={ id } className="list-group-item">
        <TodoListItem 
          { ...itemProps }
          onDeleted={ () => onDeleted(id) }
          onToggleImportant = { () => onToggleImportant(id) }
          onToggleDone = { () => onToggleDone(id) }
        />
      </li>
    );
  })

  return (    
  <ul className="list-group todo-list">
    { elements }
  </ul>
  );
};

export default TodoList;