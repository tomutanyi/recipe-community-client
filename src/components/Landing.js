import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

const Landing = () => {
  const [filter, setFilter] = useState('all'); // Default filter is 'all'

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Recipe Community
      </Typography>
      <Typography variant="h5" gutterBottom>
        Share and discover amazing recipes from all over the world.
      </Typography>

      {/* Filter Buttons */}
      <Box mt={4}>
        <Button variant="outlined" onClick={() => setFilter('all')}>All</Button>
        <Button variant="outlined" onClick={() => setFilter('Vegan')}>Vegan</Button>
        <Button variant="outlined" onClick={() => setFilter('Vegetarian')}>Vegetarian</Button>
        <Button variant="outlined" onClick={() => setFilter('Non-Vegetarian')}>Non-Vegetarian</Button>
      </Box>

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
          <RecipeCard filter={filter} />
        </div>
      </Box>
    </Container>
  );
};

export default Landing;
