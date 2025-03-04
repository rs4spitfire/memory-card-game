import React, { useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface PlayingCardProps {
  cardLabel: string;
  flipped: boolean;
  onFlip: () => void;
  cardSize: string; // Pass the card size as a prop to scale the card
}

const PlayingCard: React.FC<PlayingCardProps> = ({ cardLabel, flipped, onFlip, cardSize }) => {
  return (
    <Box sx={{ 
      width: cardSize, 
      height: cardSize, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
    }}>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: flipped ? '#fff' : '#ccc', // Background when flipped or not
          boxShadow: 3, // Match the shadow effect from GameBoard
          cursor: 'pointer',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', // Flip effect
          transition: 'transform 0.3s ease', // Smooth flip transition
          borderRadius: 2, // Rounded corners to match
          overflow: 'hidden', // Ensures no content overflows
        }}
        onClick={onFlip}
      >
        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {flipped ? (
            <Typography variant="h5">{cardLabel}</Typography> // Show label when flipped
          ) : (
            <Typography variant="h6">?</Typography> // Placeholder when not flipped
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlayingCard;
