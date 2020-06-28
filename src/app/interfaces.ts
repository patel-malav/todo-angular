export interface User {
  id: string;
  name: string;
  todos: Todo[];
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  time?: string;
  descp?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Todo {
  id: string;
  name: string;
  tasks: Task[];
  createdAt: string;
  selected?: boolean;
}
