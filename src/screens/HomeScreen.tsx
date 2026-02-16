import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '../hooks/useTodos';
import { TodoList } from '../components/TodoList';
import { AddTodo } from '../components/AddTodo';

export const HomeScreen: React.FC = () => {
  const { data: todos = [], isLoading, isRefetching, error, refetch } = useTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  const handleAddTodo = (text: string) => {
    createTodo.mutate({
      todo: text,
      completed: false,
      userId: 1,
    });
  };

  const handleToggle = (id: number, completed: boolean) => {
    updateTodo.mutate({ id, input: { completed } });
  };

  const handleUpdate = (id: number, text: string) => {
    updateTodo.mutate({ id, input: { todo: text } });
  };

  const handleDelete = (id: number) => {
    deleteTodo.mutate(id);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Mes Tâches</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{totalCount}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{completedCount}</Text>
                <Text style={styles.statLabel}>Terminées</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{totalCount - completedCount}</Text>
                <Text style={styles.statLabel}>En cours</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.content}>
        <AddTodo onAdd={handleAddTodo} />
        <TodoList
          todos={todos}
          isLoading={isLoading}
          isRefetching={isRefetching}
          error={error}
          onRefresh={refetch}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 10,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    flex: 1,
    marginTop: -15,
  },
});
