import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Header from './Header'



// Declare LayoutProps to ensure TypeScript knows about children
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header></Header>

      {/* Main content area */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          {/* Place the child components or content here */}
          {children}
        </Container>
      </Box>


    </Box>
  );
};

export default Layout;