import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';

const StarRating = ({ rating }) => {
  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} style={{ color: index < rating ? 'gold' : 'lightgray' }}>
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
        if (!response.ok) throw new Error('Failed to fetch reviews');

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
    return <Typography variant="h6">Loading reviews...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>User Reviews</Typography>
      <Grid container spacing={2}>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <Grid item xs={12} key={review.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{review.recipe_listing.name}</Typography>
                  <StarRating rating={review.rating} />
                  <Typography variant="body2">{review.commentary}</Typography>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleDelete(review.id)} 
                    style={{ marginTop: '10px' }}
                  >
                    Delete Review
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No reviews yet.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default UserReviews;
