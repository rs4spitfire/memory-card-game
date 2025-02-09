import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Star } from '@mui/icons-material'; // MUI Star Icon

interface MemoryCardProps {
  cardLabel: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ cardLabel }) => {
  const [flipped, setFlipped] = useState(false); // State to track card flip

  // Toggle flip when the card is clicked
  const handleCardClick = () => {
    setFlipped(!flipped);
  };

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
      onClick={handleCardClick}
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