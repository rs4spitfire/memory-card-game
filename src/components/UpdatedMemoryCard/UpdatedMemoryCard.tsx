import React, { useEffect } from 'react';
import { Card, CardContent } from '@mui/material';
import { Star } from '@mui/icons-material';

interface MemoryCardProps {
  cardLabel: string;
  flipped: boolean;
  onFlip: () => void;
  cardSize: string;
  visible: boolean;
}

const UpdatedMemoryCard: React.FC<MemoryCardProps> = ({ cardLabel, flipped, onFlip, cardSize, visible }) => {
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
        boxShadow: visible ? 3 : 0,
        color: 'white',
        cursor: visible ? "pointer" : "default",
        backgroundColor: visible ? (flipped ? "white" : "blue") : "white",
        transition: 'background-color 0.3s ease',
      }}
      onClick={visible ? handleClick : undefined} // Use the delayed flip function
    >
      {visible && (
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {!flipped ? (
          <Star sx={{ fontSize: 40 }} />
        ) : (
          <img
            src={`/Media/Images/${cardLabel}.jfif`} // Use jfif extension
            alt="card"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </CardContent>
      )}
    </Card>
  );
};

export default UpdatedMemoryCard;
