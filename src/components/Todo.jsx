import React, { useState, useEffect } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)      // initial fetch
  const [adding, setAdding] = useState(false)        // add todo
  const [deletingId, setDeletingId] = useState(null) // which todo is being deleted
  const [loggingOut, setLoggingOut] = useState(false)// logout
  const navigate = useNavigate()

  const getTodos = async () => {
    setLoading(true)
    try {
      const response = await api.get("/api/getTodos")
      setTodos(response.data.todos)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    const title = input.trim()
    if (!title) return
    setAdding(true)
    try {
      const response = await api.post("/api/todo", { title })
      setTodos([...todos, response.data.todo])
      setInput('')
    } catch (error) {
      console.log(error)
    } finally {
      setAdding(false)
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
    setDeletingId(id)
    try {
      await api.delete(`/api/deletetodo/${id}`)
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.log(error)
    } finally {
      setDeletingId(null)
    }
  }

 const handleLogout = async () => {
  setLoggingOut(true)
  try {
    const token = localStorage.getItem("token")
    await api.post(
      "/api/auth/logout")
    localStorage.removeItem("token")
    navigate("/login")
  } catch (error) {
    console.log(error)
    setLoggingOut(false)
  }
}

  const remaining = todos.filter((t) => !t.completed).length

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-semibold text-sm mb-3">
              ✓
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">Your tasks</h1>
            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? 'Loading your tasks...'
                : todos.length === 0
                ? 'Nothing on your list yet'
                : `${remaining} of ${todos.length} remaining`}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loggingOut ? (
              <svg
                className="animate-spin h-4 w-4 text-slate-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            )}
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <form onSubmit={addTodo} className="flex gap-2 mb-5">
            <input
              type="text"
              placeholder="Add a task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={adding}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={adding}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium px-4 py-2 hover:bg-indigo-700 active:bg-indigo-800 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed min-w-[68px]"
            >
              {adding ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              ) : (
                "Add"
              )}
            </button>
          </form>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <svg
                className="animate-spin h-5 w-5 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <p className="text-sm text-slate-400">Loading tasks...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-slate-400">Add your first task above</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className={`flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 group transition-opacity ${
                    deletingId === todo._id ? 'opacity-50' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleTodo(todo._id)}
                    disabled={deletingId === todo._id}
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
                    disabled={deletingId === todo._id}
                    className="flex-shrink-0 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-100 disabled:cursor-not-allowed"
                    aria-label="Delete task"
                  >
                    {deletingId === todo._id ? (
                      <svg
                        className="animate-spin h-4 w-4 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
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