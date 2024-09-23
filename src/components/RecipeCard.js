import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <p className="text-lg text-center">Loading recipes...</p>;
  }

  if (error) {
    return <p className="text-lg text-red-600 text-center">{error}</p>;
  }

  const handlePostClick = (event) => {
    event.stopPropagation(); // To prevent navigation when clicking the POST button
    console.log('post');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
            onClick={() => navigate(`/recipes/${recipe.id}`)}
          >
            <img
              src={recipe.image_link || 'https://via.placeholder.com/140'}
              alt={recipe.name}
              className="w-full h-36 object-cover"
            />
            <div className="p-4">
              <h5 className="text-lg font-semibold">{recipe.name}</h5>
              <p className="text-gray-600 text-sm mt-2">Ingredients: {recipe.ingredients}</p>
              <p className="text-gray-600 text-sm">Dietary Type: {recipe.dietary_type}</p>
              {user && (
                <button
                  className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  onClick={handlePostClick}
                >
                  POST
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
