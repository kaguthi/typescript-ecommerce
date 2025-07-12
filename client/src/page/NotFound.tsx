import { Link } from "react-router-dom"

function NotFound() {
  return (
    <main className="flex items-center justify-center flex-col min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Return Home
      </Link>
    </main>
  );
}

export default NotFound;
