import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardMedia, CardContent, List, ListItem, ListItemText, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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

  const handlePostClick = () => {

    if (recipe) {
      console.log(`Posting for Recipe ID: ${recipe.id}, Recipe Name: ${recipe.name}`);

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

            {/* Always render the POST button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handlePostClick}
              style={{ marginTop: '1rem' }}
            >
              POST
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default RecipeDetail;
