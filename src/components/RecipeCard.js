import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
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
    return <Typography variant="h6">Loading recipes...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const handlePostClick = () => {
    console.log("post");
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {recipes.map(recipe => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card onClick={() => navigate(`/recipes/${recipe.id}`)} style={{ cursor: 'pointer' }}>
              <CardMedia
                component="img"
                alt={recipe.name}
                height="140"
                image={recipe.image_link || 'https://via.placeholder.com/140'}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {recipe.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ingredients: {recipe.ingredients}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dietary Type: {recipe.dietary_type}
                </Typography>
                {user && (
                  <Button variant="contained" onClick={handlePostClick}>POST</Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeCard;
