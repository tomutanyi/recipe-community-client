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
  const [editReview, setEditReview] = useState(null);
  const [editedRating, setEditedRating] = useState(0);
  const [editedCommentary, setEditedCommentary] = useState('');

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

  const handleEditClick = (review) => {
    setEditReview(review);
    setEditedRating(review.rating);
    setEditedCommentary(review.commentary);
  };

  const handleEditSubmit = async () => {
    const userId = user.id; // Assuming user is passed as a prop

    const updatedReview = {
      user_id: userId,
      rating: editedRating,
      commentary: editedCommentary,
    };

    try {
      const response = await fetch(`http://127.0.0.1:5000/reviews/${editReview.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReview),
      });

      if (!response.ok) throw new Error('Failed to update review');

      const data = await response.json();
      setReviews(prevReviews => prevReviews.map(review => (review.id === editReview.id ? data.review : review)));
      setEditReview(null);
      setEditedRating(0);
      setEditedCommentary('');
    } catch (err) {
      setError(err.message);
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
      <h2 className="text-3xl font-bold mb-4">My Reviews</h2>
      <div className="grid grid-cols-1 gap-4">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="bg-white shadow-lg rounded-lg p-4">
              <StarRating rating={review.rating} />
              <p className="text-gray-700 mt-2">{review.commentary}</p>
              <button 
                onClick={() => handleEditClick(review)} 
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Review
              </button>
              <button 
                onClick={() => handleDelete(review.id)} 
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Review
              </button>
            </div>
          ))
        ) : (
          <p className="text-lg text-center">No reviews yet.</p>
        )}
      </div>

      {editReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold">Edit Review</h3>
            <StarRating rating={editedRating} />
            <div className="mt-4">
              <textarea
                rows="4"
                value={editedCommentary}
                onChange={(e) => setEditedCommentary(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Commentary"
              />
            </div>
            <button
              onClick={handleEditSubmit}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditReview(null)}
              className="mt-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReviews;
