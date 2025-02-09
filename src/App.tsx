import React from 'react';
import Layout from './components/Layout';
import { Typography, Button, Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to My App!
        </Typography>
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      </Box>
    </Layout>
  );
};

export default App;
