import React, { useState } from 'react';
import DueDatePicker from './DueDatePicker';
import Footer from './Footer';
import 'tachyons';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [checkedTodos, setCheckedTodos] = useState({});

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length > 10) {
      alert('You are exceeding the character limit!');
      setTodoValue(inputValue.slice(0, 10));
    } else {
      setTodoValue(inputValue);
    }
  };

  const addTodo = () => {
    if (!todoValue.trim()) {
      alert('Please enter a non-empty todo!');
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;
    const newTodo = { id: newId, text: todoValue, dueDate: dueDate };

    setTodos([...todos, newTodo]);
    setCheckedTodos({ ...checkedTodos, [newId]: false });
    setTodoValue('');
    setDueDate(null);
  };

  const deleteTodo = (idToDelete) => {
    const updatedTodos = todos.filter(todo => todo.id !== idToDelete);
    setTodos(updatedTodos);
    setCheckedTodos(prevState => {
      const updatedCheckedTodos = { ...prevState };
      delete updatedCheckedTodos[idToDelete];
      return updatedCheckedTodos;
    });
  };

  const toggleTodoColor = (id) => {
    setCheckedTodos({ ...checkedTodos, [id]: !checkedTodos[id] });
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isOverdue = (dueDate) => {
    return dueDate && dueDate < today;
  };

  const isDueTomorrow = (dueDate) => {
    if (!dueDate) return false;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dueDate.toDateString() === tomorrow.toDateString();
  };

  return (
    <div className="todo-container">
      <h1>Tasks:</h1>
      <div className="flex items-center">
        <input
          type="text"
          value={todoValue}
          onChange={handleInputChange}
          placeholder="Enter task name"
          className="todo-input mr2"
        />
        <DueDatePicker dueDate={dueDate} setDueDate={setDueDate} />
      </div>
      <button onClick={addTodo} className="add-button pulse mt2">Add Task</button>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${checkedTodos[todo.id] ? 'completed' : ''} ${isOverdue(todo.dueDate) ? 'overdue' : ''} ${isDueTomorrow(todo.dueDate) ? 'due-tomorrow' : ''}`}>
            <input
              type="checkbox"
              checked={checkedTodos[todo.id]}
              onChange={() => toggleTodoColor(todo.id)}
              className="todo-checkbox"
            />
            <span className="todo-text">{todo.text}</span>
            <span className="due-date">{todo.dueDate ? `Due Date: ${todo.dueDate.toLocaleDateString()}` : ''}</span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>

      <Footer todos={todos} checkedTodos={checkedTodos} toggleTodoColor={toggleTodoColor} />
    </div>
  );
}

export default Todo;
