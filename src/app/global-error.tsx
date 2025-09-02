'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-red-500 text-6xl mb-4">🚨</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              שגיאה קריטית
            </h2>
            <p className="text-gray-600 mb-6">
              אירעה שגיאה חמורה באפליקציה. אנא רענן את הדף או פנה לתמיכה.
            </p>
            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                נסה שוב
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                רענן דף
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
