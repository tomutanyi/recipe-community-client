import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-bold">
          <Link to="/">Recipe Community</Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white">Welcome, {user.username}!</span>
              <Link
                to="/my-reviews"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                My Reviews
              </Link>
              <button
                onClick={onLogout}
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
