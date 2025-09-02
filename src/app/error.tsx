'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          משהו השתבש
        </h2>
        <p className="text-gray-600 mb-6">
          אירעה שגיאה לא צפויה. אנא נסה שוב או פנה לתמיכה אם הבעיה נמשכת.
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            נסה שוב
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            חזור לדף הבית
          </button>
        </div>
      </div>
    </div>
  )
}
