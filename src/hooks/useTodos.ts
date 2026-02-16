import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../services/api';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

const TODOS_KEY = ['todos'];

export const useTodos = () => {
  return useQuery({
    queryKey: TODOS_KEY,
    queryFn: todoApi.getAll,
    select: (data) => data.todos,
    staleTime: Infinity, // Ne jamais recharger automatiquement (API fake)
    refetchOnWindowFocus: false,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoApi.create,
    // Optimistic update - on garde l'état local car l'API ne persiste pas
    onMutate: async (newTodo: CreateTodoInput) => {
      await queryClient.cancelQueries({ queryKey: TODOS_KEY });
      
      // Ajoute la todo immédiatement avec un ID temporaire
      queryClient.setQueryData(TODOS_KEY, (old: any) => ({
        ...old,
        todos: [
          { ...newTodo, id: Date.now() }, // ID temporaire unique
          ...(old?.todos || []),
        ],
      }));
    },
    // Pas de onSettled/invalidate car l'API est fake et ne persiste pas
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateTodoInput }) =>
      todoApi.update(id, input),
    // Optimistic update
    onMutate: async ({ id, input }) => {
      await queryClient.cancelQueries({ queryKey: TODOS_KEY });
      
      queryClient.setQueryData(TODOS_KEY, (old: any) => ({
        ...old,
        todos: old?.todos?.map((todo: Todo) =>
          todo.id === id ? { ...todo, ...input } : todo
        ),
      }));
    },
    // Pas de invalidate car l'API est fake
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoApi.delete,
    // Optimistic update
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: TODOS_KEY });
      
      queryClient.setQueryData(TODOS_KEY, (old: any) => ({
        ...old,
        todos: old?.todos?.filter((todo: Todo) => todo.id !== id),
      }));
    },
    // Pas de invalidate car l'API est fake
  });
};
