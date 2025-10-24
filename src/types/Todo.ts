export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

export interface TodoFormData {
  text: string;
  priority: 'low' | 'medium' | 'high';
}

export type FilterType = 'all' | 'active' | 'completed';
