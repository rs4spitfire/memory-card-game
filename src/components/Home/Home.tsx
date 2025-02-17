
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [error, setError] = useState({ player1: false, player2: false });

  const navigate = useNavigate();

  const handlePlay = () => {
    if (player1.trim() && player2.trim()) {
      navigate('/game');
    }else {
    // If not, show the error messages
        setError({
            player1: !player1.trim(),
            player2: !player2.trim(),
        });
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //justifyContent: 'center',
        minheight: '100vh',
        gap: 3,
      }}
    >
      <Typography
          variant="h3"  // Larger text size
          sx={{
            fontFamily: "'RebellionSquad'",  // Fun, playful font
            color: 'white',  // Bright color to grab attention
            textAlign: 'center',  // Centered text
            letterSpacing: 2,  // Slightly wider letters
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',  // Subtle shadow for a 3D effect
            background: '#3e92cc',  // Gradient background
            padding: '10px 20px',  // Padding to give some space around the text
            borderRadius: '8px',  // Rounded corners
            
          }}
        >
          Memory Card Game
        </Typography>
        <TextField
        label="Player 1 Name"
        variant="outlined"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
        error={error.player1}
        helperText={error.player1 ? 'Name is required' : ''}
      
      />
      <TextField
        label="Player 2 Name"
        variant="outlined"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
        error={error.player2}
        helperText={error.player2 ? 'Name is required' : ''}
      
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handlePlay} >
        
        Play
      </Button>
    </Box>
  );
};

export default Home;
