import React from 'react';
import { Box, Typography } from '@mui/material';

interface PlayerCardProps {
  name: string;
  score: number;
  isActive: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ name, score, isActive }) => {
  return (
    <Box
      sx={{
        width: '200px',
        padding: '15px',
        backgroundColor: isActive ? '#1565c0' : '#1976d2', // Darker shade for active player
        color: 'white',
        borderRadius: '8px',
        boxShadow: 3,
        textAlign: 'center',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Added shadow effect
        }}
      >
        {name}
      </Typography>
      <Typography variant="h6">Score: {score}</Typography>
    </Box>
  );
};

export default PlayerCard;
