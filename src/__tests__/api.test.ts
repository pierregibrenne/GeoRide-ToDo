import { todoApi } from '../services/api';
import { CreateTodoInput, UpdateTodoInput } from '../types/todo';

// Reset fetch mock before each test
beforeEach(() => {
  (global.fetch as jest.Mock).mockReset();
});

describe('todoApi', () => {
  describe('getAll', () => {
    it('should fetch all todos successfully', async () => {
      const mockResponse = {
        todos: [
          { id: 1, todo: 'Test todo', completed: false, userId: 1 },
        ],
        total: 1,
        skip: 0,
        limit: 20,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await todoApi.getAll();

      expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/todos?limit=20');
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(todoApi.getAll()).rejects.toThrow('Erreur lors du chargement des todos');
    });
  });

  describe('create', () => {
    it('should create a todo successfully', async () => {
      const input: CreateTodoInput = {
        todo: 'New todo',
        completed: false,
        userId: 1,
      };

      const mockResponse = { id: 151, ...input };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await todoApi.create(input);

      expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when creation fails', async () => {
      const input: CreateTodoInput = {
        todo: 'New todo',
        completed: false,
        userId: 1,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(todoApi.create(input)).rejects.toThrow('Erreur lors de la création');
    });
  });

  describe('update', () => {
    it('should update a todo successfully', async () => {
      const id = 1;
      const input: UpdateTodoInput = { completed: true };
      const mockResponse = { id, todo: 'Test', completed: true, userId: 1 };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await todoApi.update(id, input);

      expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/todos/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when update fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(todoApi.update(1, { completed: true })).rejects.toThrow('Erreur lors de la mise à jour');
    });
  });

  describe('delete', () => {
    it('should delete a todo successfully', async () => {
      const mockResponse = { id: 1, todo: 'Deleted', completed: false, userId: 1, isDeleted: true };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await todoApi.delete(1);

      expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/todos/1', {
        method: 'DELETE',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when deletion fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(todoApi.delete(1)).rejects.toThrow('Erreur lors de la suppression');
    });
  });
});
