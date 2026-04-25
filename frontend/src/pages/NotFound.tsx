// frontend/src/pages/NotFound.tsx

import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-500 text-sm mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
