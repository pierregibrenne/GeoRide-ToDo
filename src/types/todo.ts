export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateTodoInput {
  todo: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTodoInput {
  todo?: string;
  completed?: boolean;
}
