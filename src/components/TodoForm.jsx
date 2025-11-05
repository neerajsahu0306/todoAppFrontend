import React from 'react'
import useTodoStore from '../store/useTodoStore'
import { useState } from 'react'
function TodoForm() {

    const [task, setTask] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const {addTodo} = useTodoStore();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!task.trim()) {
            setError("Title cannot be empty");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);
            await addTodo({task: task.trim(), isCompleted: false});
            setTask('');
        } catch (error) {
            setError(error.message || 'failed to add todo');
        } finally{
            setIsSubmitting(false);
        }
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          disabled={isSubmitting}
          placeholder="enter todo title..."
        ></textarea>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Task"}
        </button>
      </form>
    </>
  );
}

export default TodoForm