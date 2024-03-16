import React from 'react';

const Footer = ({ todos, checkedTodos, toggleTodoColor }) => {
  const today = new Date().toLocaleDateString();
  const currentTasks = todos.filter(todo => {
    const todoDueDate = todo.dueDate ? todo.dueDate.toLocaleDateString() : null;
    return todoDueDate === today;
  });

  return (
    <footer className="todo-container">
      <h3>Tasks Due Today:</h3>
      <ul className="todo-list">
        {currentTasks.map(task => (
          <li key={task.id} className={`todo-item ${checkedTodos[task.id] ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={checkedTodos[task.id]}
              onChange={() => toggleTodoColor(task.id)}
              className="todo-checkbox"
            />
            <span className="todo-text">{task.text}</span>
            <span className="due-date">{task.dueDate ? `Due Date: ${task.dueDate.toLocaleDateString()}` : ''}</span>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
