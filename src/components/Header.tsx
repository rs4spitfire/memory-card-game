import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

const Header: React.FC = () =>{
    return(          
          <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">My App</Typography>
          </Toolbar>
        </AppBar>);
};

export default Header;