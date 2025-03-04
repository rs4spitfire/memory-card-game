import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import { useLocation } from 'react-router-dom';

interface UpdatedLayoutProps {
  children: React.ReactNode;
}

const UpdatedLayout: React.FC<UpdatedLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Apply background only if route includes '/updated/game'
  const isUpdatedGameRoute = location.pathname.includes('/updated/game');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: isUpdatedGameRoute
          ? 'radial-gradient(circle at top left, rgba(128, 0, 128, 0.5) 20%, rgba(211, 211, 211, 0.7) 60%, rgba(169, 169, 169, 0.9) 90%)'
          : 'none', // No background for other routes
      }}
    >
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: 2,
        }}
      >
        <Box sx={{ mt: 4, width: '1000px', m: 2.5 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default UpdatedLayout;
