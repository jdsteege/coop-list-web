export interface User {
  id: string;
  email: string;
}

export interface TaskList {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  listId: string;
  label: string;
  completed: boolean;
}
