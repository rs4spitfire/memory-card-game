import React, { useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';

interface MemoryCardProps {
  cardLabel: string;
  flipped: boolean;
  onFlip: () => void;
  cardSize: string;
}

const UpdatedMemoryCard: React.FC<MemoryCardProps> = ({ cardLabel, flipped, onFlip, cardSize }) => {
  
    const handleClick = () => {
      setTimeout(() => {
        onFlip(); // Delay the visual flip
      }, 200); // 200ms delay before flipping
    };
  
    useEffect(() => {
      const flipSound = new Audio('/Media/flipcard-91468.mp3'); 
      flipSound.play().catch((error) => console.error('Error playing sound:', error));
    }, [flipped]); // Runs when 'flipped' changes
  
    return (
      <Card
        sx={{
          width: cardSize,
          height: cardSize,
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 3,
          color: 'white',
          cursor: 'pointer',
          backgroundColor: flipped ? 'white' : 'blue',
          transition: 'background-color 0.3s ease',
        }}
        onClick={handleClick} // Use the delayed flip function
      >
        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {!flipped ? (
            <Star sx={{ fontSize: 40 }} />
          ) : (
            <Typography variant="h6" align="center" color="black">
              {cardLabel}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  };
  

export default UpdatedMemoryCard;
