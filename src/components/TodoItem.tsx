import React, { useState } from 'react';
import type { Todo } from '../types/Todo';
import '../styles/TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const getPriorityClass = (priority: string) => {
    return `priority-${priority}`;
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${getPriorityClass(todo.priority)}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyPress}
            className="edit-input"
            autoFocus
            maxLength={200}
          />
        ) : (
          <span 
            className="todo-text"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
        
        <div className="todo-meta">
          <span className="priority-badge">{todo.priority}</span>
          <span className="created-date">
            {todo.createdAt.toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-button"
          title="Edit todo"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="delete-button"
          title="Delete todo"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
