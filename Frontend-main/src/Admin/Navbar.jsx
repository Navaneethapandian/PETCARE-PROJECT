import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <Link
          to="/admin"
          className="block py-2 px-4 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          Insert
        </Link>
        <Link
          to="/history"
          className="block py-2 px-4 bg-green-600 rounded hover:bg-green-700 transition-colors"
        >
          History
        </Link>
        <Link
          to="/adopted"
          className="block py-2 px-4 bg-purple-600 rounded hover:bg-purple-700 transition-colors"
        >
          Adopted
        </Link>
        <Link
          to="/unadopted"
          className="block py-2 px-4 bg-red-600 rounded hover:bg-red-700 transition-colors"
        >
          Unadopted
        </Link>
      </div>
    </div>
  </nav>
  );
};
