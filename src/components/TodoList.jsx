import React from 'react'
import useTodoStore from '../store/useTodoStore'
import Loader from './Loader'
import TodoItem from './TodoItem';
function TodoList({filter = 'active'}) {

  const {todos, loading, error} = useTodoStore();
  const todosList = Array.isArray(todos) ? todos : [];
  const filterTodos = todosList.filter((todo) => {
    if (filter == 'active') {
      return !todo.isCompleted;
    } else if(filter == 'completed') {
      return todo.isCompleted;
    } return true;
  })

  if (loading && todos.length === 0) {
    return <Loader/>
  }
  if (error) {
    return <p className=' text-red-500'>{error}</p>
  }

  if (filterTodos.length === 0) {
    const message = filter === 'active' ? 'No active todos...' : 'no compelted todos'
    return <p className=' text-gray-500'>{message}</p>
  }
  return (
    <>
    <div>
      {filterTodos.map((todo) => (<TodoItem key={todo._id} todo={todo} filter={filter}/>))}
    </div>
    </>
  )
}

export default TodoList