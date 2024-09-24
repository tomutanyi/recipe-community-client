import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

const Landing = () => {
  const [filter, setFilter] = useState('all'); // Default filter is 'all'

  return (
    <div className="container mx-auto text-center mt-16">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to Recipe Community
      </h1>
      <p className="text-xl mb-6">
        Share and discover amazing recipes from all over the world.
      </p>

      {/* Filter Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={() => setFilter('all')}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
        >
          All
        </button>
        <button
          onClick={() => setFilter('Vegan')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Vegan
        </button>
        <button
          onClick={() => setFilter('Vegetarian')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Vegetarian
        </button>
        <button
          onClick={() => setFilter('Non-Vegetarian')}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Non-Vegetarian
        </button>
      </div>

      <div className="mt-8">
        <Link
          to="/signup"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
        >
          Get Started
        </Link>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Latest Recipes</h2>
        <div className="flex flex-wrap justify-center space-x-4">
          <RecipeCard filter={filter} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
