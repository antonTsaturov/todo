import React, { useState } from 'react';
import type { TodoFormData } from '../types/Todo';
import '../styles/AddTodo.css';

interface TodoFormProps {
  onAddTodo: (todo: TodoFormData) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [formData, setFormData] = useState<TodoFormData>({
    text: '',
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.text.trim()) {
      onAddTodo(formData);
      setFormData({ text: '', priority: 'medium' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      text: e.target.value
    }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      priority: e.target.value as 'low' | 'medium' | 'high'
    }));
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={formData.text}
          onChange={handleInputChange}
          placeholder="What needs to be done?"
          className="todo-input"
          maxLength={200}
        />
        <select
          value={formData.priority}
          onChange={handlePriorityChange}
          className="priority-select"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button type="submit" className="add-button" disabled={!formData.text.trim()}>
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
