import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

const Landing = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Recipe Community
      </Typography>
      <Typography variant="h5" gutterBottom>
        Share and discover amazing recipes from all over the world.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" size="large" component={Link} to="/signup">
          Get Started
        </Button>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Latest Recipes
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <div style={{ margin: '1rem' }}>
            <RecipeCard />
          </div>
          <div style={{ margin: '1rem' }}>
            <RecipeCard />
          </div>
          <div style={{ margin: '1rem' }}>
            <RecipeCard />
          </div>
          {/* Add more RecipeCards as needed */}
        </div>
      </Box>
    </Container>
  );
};

export default Landing;
