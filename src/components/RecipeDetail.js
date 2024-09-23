import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { Alert, Snackbar } from '@mui/material';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [commentary, setCommentary] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    const fetchRecipeAndReviews = async () => {
      try {
        const recipeResponse = await fetch(`http://127.0.0.1:5000/recipes/${id}`);
        if (!recipeResponse.ok) throw new Error('Failed to fetch recipe');
        const recipeData = await recipeResponse.json();
        setRecipe(recipeData);

        const reviewsResponse = await fetch(`http://127.0.0.1:5000/recipes/${id}/reviews`);
        if (!reviewsResponse.ok) throw new Error('Failed to fetch reviews');
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeAndReviews();
  }, [id]);

  const handlePostClick = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setOpenAlert(true);
      return; // Prevent further execution if the user is not logged in
    }
  
    const reviewData = {
      recipe_listing_id: recipe.id,
      rating: parseInt(rating),
      commentary,
      user_id: user.id,
    };
  
    try {
      const response = await fetch('http://127.0.0.1:5000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });
  
      if (!response.ok) throw new Error('Failed to post review');
  
      const data = await response.json();
      setReviews((prevReviews) => [...prevReviews, data.review]);
      setRating(0);
      setCommentary('');
    } catch (err) {
      console.error('Error:', err);
    }
  };
  

  const handleRatingClick = (value) => setRating(value);

  const renderStars = (ratingValue) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          size={20}
          className={value <= ratingValue ? 'text-yellow-500' : 'text-gray-400'}
        />
      ))}
    </div>
  );

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  if (loading) return <p className="text-lg text-center">Loading...</p>;
  if (error) return <p className="text-lg text-red-600 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      {recipe && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={recipe.image_link || 'https://via.placeholder.com/140'}
            alt={recipe.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-semibold">{recipe.name}</h1>
            <h5 className="text-2xl font-semibold">Ingredients</h5>
            <p className="text-gray-700 mt-2">{recipe.ingredients}</p>
            <h5 className="text-2xl font-semibold">Instructions</h5>
            <p className="text-gray-700 mt-2">{recipe.instructions}</p>

            <p className="text-gray-700">Dietary Type: {recipe.dietary_type}</p>

            <h3 className="text-xl font-semibold mt-6">Reviews:</h3>
            <ul className="mt-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <li key={review.id} className="border-b border-gray-200 py-2">
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-gray-700">{review.user.username}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{review.commentary}</p>
                  </li>
                ))
              ) : (
                <li className="py-2">
                  <p className="text-gray-600">No reviews available.</p>
                </li>
              )}
            </ul>

            <h3 className="text-xl font-semibold mt-6">Leave a Review:</h3>
            <div className="mt-4">
              <div className="mb-4">
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index + 1}
                      size={24}
                      className={`cursor-pointer ${index + 1 <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                      onClick={() => handleRatingClick(index + 1)}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  rows="4"
                  value={commentary}
                  onChange={(e) => setCommentary(e.target.value)}
                  placeholder="Commentary"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <button
                onClick={handlePostClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                POST REVIEW
              </button>
            </div>
          </div>
        </div>
      )}
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="warning">
          User is not logged in!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RecipeDetail;
 