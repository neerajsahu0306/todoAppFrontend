import React from 'react'
import { useState } from 'react'
import useTodoStore from '../store/useTodoStore'
function TodoItem({todo, filter}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedtask] = useState(todo.task);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const {updateTodo, deleteTodo, toggleTodo} = useTodoStore();


    const handleToggle = async () => {
        try {
            setIsSubmitting(true);
            setError(null);
            await toggleTodo(todo.id);
        } catch (error) {
            setError(error.message || 'failed to toggle todo')
        } finally{
            setIsSubmitting(false);
        }
    }


    const handleEditSubmit = async () => {
      console.log("entire todo:", todo)
        if(!editedTask.trim()) {
            setError("task can't be empty");
            return;
        }
        if (editedTask.trim() === todo.task) {
            setIsEditing(false);
            return;
        }
        try {
            
            setIsSubmitting(true);
            setError(null);
            await updateTodo(todo.id, {task: editedTask.trim()})
            setIsEditing(false);
        } catch (error) {
            setError(error.message || "failed to update todo")
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleDelete = async () => {
        try {

            setIsSubmitting(true);
            setError(null);
            await deleteTodo(todo.id);
            console.log("deleted Successfully");
            
        } catch (error) {
            setError(error.message || 'failed to delete todo');
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleCancelEdit = () => {
      setEditedtask(todo.task)
      setIsEditing(false)
      setError(null)
    };

  return (
    <div className="border rounded-lg p-4">
      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="flex items-center justify-between gap-3">
        {/* Task Content */}
        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <textarea
              type="text"
              value={editedTask}
              onChange={(e) => setEditedtask(e.target.value)}
              disabled={isSubmitting}
              className="flex-1 border rounded px-2 py-1"
            ></textarea>
            <button
              onClick={handleEditSubmit}
              disabled={isSubmitting}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isSubmitting}
              className="px-3 py-1 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <span
            className={`flex-1 ${
              todo.isCompleted ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {todo.task}
          </span>
        )}

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex gap-2">
            {filter === "active" && (
              <>
                <button
                  onClick={handleToggle}
                  disabled={isSubmitting}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  ✓ Complete
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  disabled={isSubmitting}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
              </>
            )}

            {filter === "completed" && (
              <button
                onClick={handleToggle}
                disabled={isSubmitting}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Undo
              </button>
            )}

            {/* Delete always shows */}
            <button
              onClick={handleDelete}
              disabled={isSubmitting}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoItem