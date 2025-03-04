import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

const Footer: React.FC = () =>{
    return(                
      <Box sx={{ py: 2, backgroundColor: '#f1f1f1', textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          © 2025 My App - All rights reserved
        </Typography>
      </Box>
)};

export default Footer;