import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';

const Home: React.FC = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [error, setError] = useState({ player1: false, player2: false });

  const navigate = useNavigate();

  const handleDifficultyChange = (event: SelectChangeEvent<string>) => {
    setDifficulty(event.target.value);
  };

  const handlePlay = () => {
    if (player1.trim() && player2.trim()) {
      navigate('/updated/game', { state: { player1, player2, difficulty } });
    } else {
      setError({
        player1: !player1.trim(),
        player2: !player2.trim(),
      });
    }
  };

  const handleClear = () => {
    setPlayer1('');
    setPlayer2('');
    setError({ player1: false, player2: false });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        gap: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: "'RebellionSquad'",
          color: 'white',
          textAlign: 'center',
          letterSpacing: 2,
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
          background: '#3e92cc',
          padding: '10px 20px',
          borderRadius: '8px',
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

      {/* Difficulty Select */}
      <FormControl variant="outlined" sx={{ minWidth: 120, marginTop: 2 }}>
        <InputLabel>Difficulty</InputLabel>
        <Select
          value={difficulty}
          onChange={handleDifficultyChange}
          label="Difficulty"
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'inline-flex', gap: 2, marginTop: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handlePlay} 
          sx={{ minWidth: 120 }}
        >
          Play
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleClear} 
          sx={{ minWidth: 120 }}
        >
          Clear Names
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
