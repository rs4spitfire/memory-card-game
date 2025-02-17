import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Star } from '@mui/icons-material'; // MUI Star Icon

interface MemoryCardProps {
  cardLabel: string;
  flipped: boolean; // Whether the card is flipped or not
  onFlip: () => void; // Function to handle the card flip
}

const MemoryCard: React.FC<MemoryCardProps> = ({ cardLabel, flipped, onFlip }) => {
  return (
    <Card
      sx={{
        width: 120, // Fixed width to make it square
        height: 120, // Fixed height to make it square
        borderRadius: 2, // Rounded corners
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 3, // Optional, adds shadow for better visual depth
        color: 'white', // White text color
        cursor: 'pointer',
        backgroundColor: flipped ? 'white' : 'blue', // Conditional background color
        transition: 'background-color 0.3s ease', // Smooth background color transition
      }}
      onClick={onFlip} // Trigger onFlip when the card is clicked
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Front of the card (star icon) */}
        {!flipped ? (
          <Star sx={{ fontSize: 40 }} /> // Show Star icon on the front when not flipped
        ) : (
          <Typography variant="h6" align="center" color="black">{cardLabel}</Typography> // Show text on the back when flipped
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryCard;