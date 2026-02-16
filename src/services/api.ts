import { Todo, TodosResponse, CreateTodoInput, UpdateTodoInput } from '../types/todo';

const BASE_URL = 'https://dummyjson.com';

export const todoApi = {
  // Récupérer toutes les todos
  getAll: async (): Promise<TodosResponse> => {
    const response = await fetch(`${BASE_URL}/todos?limit=20`);
    if (!response.ok) throw new Error('Erreur lors du chargement des todos');
    return response.json();
  },

  // Créer une todo
  create: async (input: CreateTodoInput): Promise<Todo> => {
    const response = await fetch(`${BASE_URL}/todos/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  },

  // Mettre à jour une todo
  update: async (id: number, input: UpdateTodoInput): Promise<Todo> => {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return response.json();
  },

  // Supprimer une todo
  delete: async (id: number): Promise<Todo> => {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
    return response.json();
  },
};
