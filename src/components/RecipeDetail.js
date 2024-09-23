import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardMedia, CardContent, List, ListItem, ListItemText, Button, TextField, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState('');
  const [commentary, setCommentary] = useState('');

  useEffect(() => {
    const fetchRecipeAndReviews = async () => {
      try {
        const recipeResponse = await fetch(`http://127.0.0.1:5000/recipes/${id}`);
        if (!recipeResponse.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const recipeData = await recipeResponse.json();
        setRecipe(recipeData);

        const reviewsResponse = await fetch(`http://127.0.0.1:5000/recipes/${id}/reviews`);
        if (!reviewsResponse.ok) {
          throw new Error('Failed to fetch reviews');
        }
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
      console.log('User is not logged in');
      return;
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error('Failed to post review');
      }

      const data = await response.json();
      console.log('Review posted successfully:', data);
      setRating('');
      setCommentary('');

      setReviews([...reviews, data.review]);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Container>
      {recipe && (
        <Card>
          <CardMedia
            component="img"
            alt={recipe.name}
            height="140"
            image={recipe.image_link || 'https://via.placeholder.com/140'}
          />
          <CardContent>
            <Typography variant="h5">{recipe.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Ingredients: {recipe.ingredients}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dietary Type: {recipe.dietary_type}
            </Typography>

            {/* Display reviews */}
            <Typography variant="h6">Reviews:</Typography>
            <List>
              {Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map(review => (
                  <ListItem key={review.id}>
                    <ListItemText
                      primary={`Rating: ${review.rating}`}
                      secondary={review.commentary}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No reviews available." />
                </ListItem>
              )}
            </List>

            {/* Form for submitting reviews */}
            <Typography variant="h6" style={{ marginTop: '1rem' }}>Leave a Review:</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Rating"
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  fullWidth
                  required
                  inputProps={{ min: 1, max: 5 }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Commentary"
                  multiline
                  rows={4}
                  value={commentary}
                  onChange={(e) => setCommentary(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            {/* POST button for submitting reviews */}
            <Button
              variant="contained"
              color="primary"
              onClick={handlePostClick}
              style={{ marginTop: '1rem' }}
            >
              POST REVIEW
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default RecipeDetail;
