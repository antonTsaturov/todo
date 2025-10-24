import React, { useState } from 'react';
import type { FilterType } from '../types/Todo';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useTodos } from '../hooks/useTodos';
import '../styles/TodoList.css';

const TodoList: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    clearAllTodos
  } = useTodos();

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="todo-list-container">
      <header className="todo-header">
        <h1>📝</h1>
        <h1>Todo List</h1>
      </header>

      <TodoForm onAddTodo={addTodo} />

      <div className="todo-stats">
        <div className="stat-item">
          <span className="stat-number">{todos.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{activeCount}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="todo-filters">
        <button
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        {completedCount > 0 && (
          <button
            className="clear-completed-button"
            onClick={clearCompleted}
          >
            Clear Completed
          </button>
        )}
        {todos.length > 0 && (
          <button
            className="clear-all-button"
            onClick={clearAllTodos}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="todo-items-container">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>No todos found</p>
            <p className="empty-hint">
              {filter === 'all' 
                ? 'Add your first todo above!' 
                : `No ${filter} todos.`
              }
            </p>
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
