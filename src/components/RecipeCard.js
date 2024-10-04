import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ filter }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://recipe-community-server-1.onrender.com/recipes');
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

  // Filter recipes based on the selected dietary filter
  const filteredRecipes = recipes.filter((recipe) => {
    if (filter === 'all') return true;
    return recipe.dietary_type === filter;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
