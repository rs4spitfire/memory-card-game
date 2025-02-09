import React from 'react';
import { Box } from '@mui/system'; // For the Box system
import MemoryCard from '../MemoryCard/MemoryCard'; // Make sure to import MemoryCard


const GameBoard: React.FC = () => {
  const cards = [
    'Card 1', 'Card 2', 'Card 3',
    'Card 4', 'Card 5', 'Card 6',
    'Card 7', 'Card 8', 'Card 9',
  ];

  return (
    <Box
      sx={{
        width: '500px', // Fixed width for the game board
        height: '500px', // Fixed height for the game board
        display: 'grid', // Use grid layout for better control
        gridTemplateColumns: 'repeat(3, 1fr)', // 3 equal columns
        gridTemplateRows: 'repeat(3, 1fr)', // 3 equal rows
        gap: 2, // Add gap between the cards
        backgroundColor: '#f5f5f5', // Background color for the board
        boxShadow: 3, // Adds shadow to make it stand out
        borderRadius: 2, // Rounded corners
        overflow: 'hidden', // Prevent overflow of cards outside the GameBoard
      }}
    >
      {cards.map((card, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* MemoryCard component */}
          <MemoryCard cardLabel={card} />
        </Box>
      ))}
    </Box>
  );
};

export default GameBoard;