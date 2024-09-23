import React, { useState, useEffect } from 'react';

const StarRating = ({ rating }) => {
  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  );
};

const UserReviews = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) return;

      try {
        const response = await fetch(`http://127.0.0.1:5000/users/${user.id}/reviews`);
        if (!response.ok) throw new Error('No reviews yet :(');

        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/reviews/${reviewId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete review');

        setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <p className="text-lg text-center">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-lg text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">User Reviews</h2>
      <div className="grid grid-cols-1 gap-4">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold">{review.recipe_listing.name}</h3>
              <StarRating rating={review.rating} />
              <p className="text-gray-700 mt-2">{review.commentary}</p>
              <button 
                onClick={() => handleDelete(review.id)} 
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Review
              </button>
            </div>
          ))
        ) : (
          <p className="text-lg text-center">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserReviews;
