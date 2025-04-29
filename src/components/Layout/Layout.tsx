import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isGameRoute = location.pathname.includes('/game');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: isGameRoute ? '#b2ebf2' : 'none', // Slightly darker light blue
      }}
    >
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

export default Layout;
