import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  isRefetching: boolean;
  error: Error | null;
  onRefresh: () => void;
  onToggle: (id: number, completed: boolean) => void;
  onUpdate: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  isLoading,
  isRefetching,
  error,
  onRefresh,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Chargement des tâches...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      </View>
    );
  }

  if (todos.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyIcon}>✨</Text>
        <Text style={styles.emptyText}>Liste vide</Text>
        <Text style={styles.emptySubtext}>
          Ajoutez votre première tâche ci-dessus
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
      refreshControl={
        <RefreshControl 
          refreshing={isRefetching} 
          onRefresh={onRefresh}
          tintColor="#667eea"
          colors={['#667eea']}
        />
      }
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: '#fff5f5',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    fontWeight: '500',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
  },
});
