import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onUpdate: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo);

  const handleSave = () => {
    if (editText.trim() && editText !== todo.todo) {
      onUpdate(todo.id, editText.trim());
    } else {
      setEditText(todo.todo);
    }
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => onToggle(todo.id, !todo.completed)}
          activeOpacity={0.7}
        >
          {todo.completed ? (
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.checkboxInner}
            >
              <Text style={styles.checkmark}>✓</Text>
            </LinearGradient>
          ) : (
            <View style={styles.checkboxEmpty} />
          )}
        </TouchableOpacity>

        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editText}
            onChangeText={setEditText}
            onBlur={handleSave}
            onSubmitEditing={handleSave}
            autoFocus
            returnKeyType="done"
          />
        ) : (
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => setIsEditing(true)}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, todo.completed && styles.completedText]}>
              {todo.todo}
            </Text>
            {todo.completed && (
              <Text style={styles.completedBadge}>Terminée</Text>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(todo.id)}
          activeOpacity={0.7}
        >
          <View style={styles.deleteCircle}>
            <Text style={styles.deleteText}>×</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    gap: 14,
  },
  checkbox: {
    padding: 2,
  },
  checkboxInner: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxEmpty: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '500',
    lineHeight: 22,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#b2bec3',
  },
  completedBadge: {
    fontSize: 11,
    color: '#00b894',
    fontWeight: '600',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: '#667eea',
    borderRadius: 12,
    backgroundColor: '#f8f9ff',
    color: '#333',
  },
  deleteButton: {
    padding: 4,
  },
  deleteCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#ffe5e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#ff6b6b',
    fontSize: 22,
    fontWeight: '400',
    marginTop: -2,
  },
});
