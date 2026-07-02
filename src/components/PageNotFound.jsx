import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm text-center">
        {/* Brand mark */}
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-semibold text-sm mb-6">
          ✓
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <p className="text-sm font-medium text-indigo-600 mb-2">404</p>
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">
            Page not found
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <Link
            to="/todo"
            className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-medium py-2.5 hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
          >
            Back to your tasks
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound