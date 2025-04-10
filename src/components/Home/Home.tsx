import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import RulesModal from '../RulesModal/RulesModal';

const Home: React.FC = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [error, setError] = useState({ player1: false, player2: false });
  const [openRules, setOpenRules] = useState(false);
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
        flexDirection: 'row',
        alignItems: 'flex-start',
        minHeight: '100vh',
        background: '#f0f4f8',
        padding: 4,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, width: 400 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'RebellionSquad'",
            color: '#3e92cc',
            textAlign: 'left',
            mb: 4,
            letterSpacing: 1,
          }}
        >
          Memory Card Game
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Player 1 Name"
            variant="outlined"
            fullWidth
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            error={error.player1}
            helperText={error.player1 ? 'Name is required' : ''}
          />

          <TextField
            label="Player 2 Name"
            variant="outlined"
            fullWidth
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            error={error.player2}
            helperText={error.player2 ? 'Name is required' : ''}
          />

          <FormControl fullWidth>
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

          <Button
            variant="contained"
            color="primary"
            onClick={handlePlay}
            sx={{
              mt: 3,
              height: 56,
              fontSize: '1.1rem',
              fontWeight: 'bold',
            }}
            fullWidth
          >
            ▶ Play
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClear}
              sx={{ width: '48%' }}
            >
              Clear
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpenRules(true)}
              sx={{ width: '48%' }}
            >
              Rules
            </Button>
          </Box>
        </Box>
      </Paper>

      <RulesModal open={openRules} onClose={() => setOpenRules(false)} />
    </Box>
  );
};

export default Home;

