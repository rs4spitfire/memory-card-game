import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system'; // For the Box system
import { Button } from '@mui/material';
import MemoryCard from '../MemoryCard/MemoryCard'; // Make sure to import MemoryCard

const GameBoard: React.FC = () => {
  const cards = [
    'Card 1', 'Card 2', 'Card 2',
    'Card 6', 'Card 1', 'Card 6',
    'Card 7', 'Card 7', 'Card 9',
    'Card 9', 'Card 10', 'Card 10'
  ];

  // State to track which cards are flipped, initially all false (not flipped)
  const [flippedCards, setFlippedCards] = useState<boolean[]>(new Array(cards.length).fill(false));
  
  // State to store indices of the flipped cards
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  // Function to handle card flip
  const handleCardFlip = (index: number) => {
    if (flippedIndices.length === 2) return; // Don't flip if 2 cards are already flipped

    // Update flipped status for the specific card
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
    
    // Update flippedIndices to track the indices of flipped cards
    setFlippedIndices(prev => [...prev, index]);
  };

  // Effect to handle card matching and resetting
  useEffect(() => {
    // If 2 cards are flipped, compare them
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      
      if (cards[firstIndex] !== cards[secondIndex]) {
        // Cards don't match, reset them after a 0.5 second delay
        setTimeout(() => {
          const resetFlippedCards = [...flippedCards];
          resetFlippedCards[firstIndex] = false;
          resetFlippedCards[secondIndex] = false;
          setFlippedCards(resetFlippedCards);
          setFlippedIndices([]); // Clear the flipped indices
        }, 500); // 500ms delay
      } else {
        // Cards match, just clear the flippedIndices
        setFlippedIndices([]);
      }
    }
  }, [flippedIndices, flippedCards, cards]);

  // Reset game
  const resetGame = () => {
    setFlippedCards(new Array(cards.length).fill(false)); // Reset all cards to not flipped
    setFlippedIndices([]); // Clear flipped indices
  };

  return (
    <div>
      <Box
        sx={{
          width: '700px',
          height: '500px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: 2,
          backgroundColor: '#f5f5f5',
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {cards.map((card, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <MemoryCard
              cardLabel={card}
              flipped={flippedCards[index]}
              onFlip={() => handleCardFlip(index)}
            />
          </Box>
        ))}
      </Box>
      
      {/* Button to reset all cards */}
      <Button onClick={resetGame} variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Play Again
      </Button>
    </div>
  );
};

export default GameBoard;