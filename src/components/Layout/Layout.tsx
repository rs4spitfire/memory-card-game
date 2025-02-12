import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';

// Declare LayoutProps to ensure TypeScript knows about children
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      
      }}>
      <Header />

      {/* Main content area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: 'center',  // Center content horizontally
          alignItems: 'center',  // Center content vertically 
        }}>
        <Box sx={{ mt: 4, width: '1000px', m: 2.5 }}> {/* 20px margin */}
          {/* Place the child components or content here */}
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;