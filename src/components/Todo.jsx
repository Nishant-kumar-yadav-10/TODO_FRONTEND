import React, { useState, useEffect } from 'react'
import api from '../api/axios'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const getTodos = async () => {
    try {
      const response = await api.get("/api/getTodos")
      setTodos(response.data.todos)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    const title = input.trim()
    if (!title) return
    try {
      const response = await api.post("/api/todo", { title })
      setTodos([...todos, response.data.todo])
      setInput('')
    } catch (error) {
      console.log(error)
    }
  }

  const toggleTodo = async (id) => {
    try {
      await api.patch(`/api/updatetodo/${id}`, {})
      setTodos(todos.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t)))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/api/deletetodo/${id}`)
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const remaining = todos.filter((t) => !t.completed).length

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-semibold text-sm mb-3">
            ✓
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">Your tasks</h1>
          <p className="mt-1 text-sm text-slate-500">
            {todos.length === 0
              ? 'Nothing on your list yet'
              : `${remaining} of ${todos.length} remaining`}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <form onSubmit={addTodo} className="flex gap-2 mb-5">
            <input
              type="text"
              placeholder="Add a task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 text-white text-sm font-medium px-4 py-2 hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
            >
              Add
            </button>
          </form>

          {todos.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-slate-400">Add your first task above</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 group"
                >
                  <button
                    type="button"
                    onClick={() => toggleTodo(todo._id)}
                    className={`flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? 'bg-indigo-600 border-indigo-600'
                        : 'border-slate-300 hover:border-indigo-400'
                    }`}
                    aria-label={todo.completed ? 'Mark as not done' : 'Mark as done'}
                  >
                    {todo.completed && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>

                  <span
                    className={`flex-1 text-sm ${
                      todo.completed ? 'text-slate-400 line-through' : 'text-slate-800'
                    }`}
                  >
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    onClick={() => deleteTodo(todo._id)}
                    className="flex-shrink-0 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete task"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Todo