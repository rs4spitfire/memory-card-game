import React from 'react';
import { Box, Typography } from '@mui/material';

interface PlayerCardProps {
  name: string;
  score: number;
  isActive: boolean;
}

const UpdatedPlayerCard: React.FC<PlayerCardProps> = ({ name, score, isActive }) => {
  return (
    <Box
      sx={{
        width: '200px',
        padding: '15px',
        backgroundColor: isActive ? '#1976d2' : '#ffffff', // Blue for active, White for inactive
        color: isActive ? 'white' : 'black', // Ensure readability
        borderRadius: '8px',
        boxShadow: 3,
        textAlign: 'center',
        transition: 'background-color 0.3s ease',
        border: isActive ? 'none' : '2px solid #1976d2', // Optional: border for inactive player
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          textShadow: isActive ? '2px 2px 4px rgba(0, 0, 0, 0.5)' : 'none',
        }}
      >
        {isActive ? `* ${name}` : name}
      </Typography>
      <Typography variant="h6">Score: {score}</Typography>
    </Box>
  );
};

export default UpdatedPlayerCard;