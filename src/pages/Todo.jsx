import React, { useEffect } from 'react'
import { TodoForm, TodoList } from '../components'
import useTodoStore from '../store/useTodoStore'

function Todo() {
  const {fetchTodos} = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Input Box */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Add New Todo
          </h2>
          <TodoForm />
        </div>

        {/* Active Todos */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Active Todos
          </h2>
          <TodoList filter="active" />
        </div>

        {/* Completed Todos */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Completed Todos
          </h2>
          <TodoList filter="completed" />
        </div>
      </div>
    </>
  );
}

export default Todo