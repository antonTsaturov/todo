import { useState } from 'react';
import type { Todo } from '../types/Todo';

const STORAGE_KEY = 'todo-app-todos';

export const useLocalStorage = (key: string, initialValue: Todo[]) => {
  const [storedValue, setStoredValue] = useState<Todo[]>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        // Convert createdAt strings back to Date objects
        return parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      }
      return initialValue;
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: Todo[] | ((val: Todo[]) => Todo[])) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
};

export const useTodos = () => {
  const [todos, setTodos] = useLocalStorage(STORAGE_KEY, []);

  const addTodo = (formData: { text: string; priority: 'low' | 'medium' | 'high' }) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: formData.text,
      completed: false,
      createdAt: new Date(),
      priority: formData.priority
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const clearAllTodos = () => {
    setTodos([]);
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    clearAllTodos
  };
};
