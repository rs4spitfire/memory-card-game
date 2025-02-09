import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

const Header: React.FC = () =>{
    return(          
          <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Spring 2025 User Interface Desgn/Dev (SWE-632-DL1, SWE-632-004)</Typography>
          </Toolbar>
        </AppBar>);
};

export default Header;