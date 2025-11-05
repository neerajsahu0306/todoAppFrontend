import { create } from "zustand";
import todoApi from '../api/todoApi'

const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      
      const todos = await todoApi.getAllTodos();
      
      
      set({ todos, loading: false });
    } catch (error) {
      set({
        error: error.message || "failed to fetch todos",
        loading: false,
      });
    }
  },

  addTodo: async (todoData) => {
    set({ loading: true, error: null });
    try {
      const newTodo = await todoApi.createTodo(todoData);

      const currentState = get(); // Get current state
      const currentTodos = Array.isArray(currentState.todos)
        ? currentState.todos
        : [];

      set({
        todos: [...currentTodos, newTodo],
        loading: false,
      });
      return newTodo;
    } catch (error) {
      set({
        error: error.message || "failed to create a new todo",
        loading: false,
      });
      throw error;
    }
  },

  updateTodo: async (todoId, updates) => {
    
    set({ loading: true, error: null });

    try {
      const updatedTodo = await todoApi.updateTodo(todoId, updates);
      
      set((state) => {
       
        const newTodos = state.todos.map((todo) =>
          todo.id === todoId ? updatedTodo : todo
        );
        

        return {
          todos: newTodos,
          loading: false,
        };
      });
      return updatedTodo;
    } catch (error) {
      set({
        error: error.message || "failed to update todo",
        loading: false,
      });
      throw error;
    }
  },

  deleteTodo: async (todoId) => {
    set({ loading: true, error: null });
    try {
      await todoApi.deleteTodo(todoId);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== todoId),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.message || "failed to delete todo",
        loading: false,
      });
      throw error;
    }
  },

  toggleTodo: async (todoId) => {
    const todo = get().todos.find((t) => t.id === todoId)
    if (!todo) {
      throw new Error("todo not found");
    }

    return get().updateTodo(todoId, { isCompleted: !todo.isCompleted });
  },

  clearError: () => set({ error: null }),

  clearTodos: () => set({ todos: [], loading: false, error: null }),
}));


export default useTodoStore;