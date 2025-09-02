import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          דף לא נמצא
        </h2>
        <p className="text-gray-600 mb-6">
          הדף שחיפשת לא קיים או הועבר למיקום אחר.
        </p>
        <Link
          href="/"
          className="inline-block w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          חזור לדף הבית
        </Link>
      </div>
    </div>
  )
}
