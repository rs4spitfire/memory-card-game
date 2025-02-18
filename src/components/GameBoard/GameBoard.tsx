import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import MemoryCard from '../MemoryCard/MemoryCard';
import GameOverModal from '../GameOverModal/GameOverModal';

const GameBoard: React.FC = () => {

  const baseCards = useMemo(() => [
    'Card 1', 'Card 1',
    'Card 2', 'Card 2',
    'Card 3', 'Card 3',
    'Card 4', 'Card 4',
    'Card 5', 'Card 5',
    'Card 6', 'Card 6'
], []);  // Empty dependency array means this won't change unless explicitly needed


const shuffleCards = (cards: string[]) => {
    const shuffled = [...cards]; // Create a copy to avoid mutation
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap cards
    }
    return shuffled; // Return the new shuffled array
};


    const location = useLocation();
    const navigate = useNavigate();
    
    const { player1, player2 } = location.state || {};
    

    const [shuffledCards, setShuffledCards] = useState<string[]>(shuffleCards([...baseCards]));


    const [player1Score, setPlayer1Score] = useState<number>(0);
    const [player2Score, setPlayer2Score] = useState<number>(0);
    const [currentPlayer, setCurrentPlayer] = useState<string>(player1);
    const [flippedCards, setFlippedCards] = useState<boolean[]>(new Array(shuffledCards.length).fill(false));
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [numPairsLeft, setNumPairsLeft] = useState<number>(6);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>('');
    const [playerNumber, setPlayerNumber] = useState(1); // Player 1 starts


    const switchPlayer = useCallback(() => {
      setCurrentPlayer((prevPlayer) => (prevPlayer === player1 ? player2 : player1));
      setPlayerNumber((prevPlayerNumber) => (prevPlayerNumber === 1 ? 2 : 1));
  }, [player1, player2, setCurrentPlayer, setPlayerNumber]);
  
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
        if (flippedIndices.length === 2) {
            const [firstIndex, secondIndex] = flippedIndices;

            if (shuffledCards[firstIndex] !== shuffledCards[secondIndex]) {
                // Cards don't match, reset them after a 0.5 second delay
                setTimeout(() => {
                    const resetFlippedCards = [...flippedCards];
                    resetFlippedCards[firstIndex] = false;
                    resetFlippedCards[secondIndex] = false;
                    setFlippedCards(resetFlippedCards);
                    setFlippedIndices([]); // Clear the flipped indices
                    switchPlayer(); // Switch turn
                }, 500); // 500ms delay
            } else {
                // Cards match: Award 10 points
                if (playerNumber === 1) {
                    setPlayer1Score((prev) => prev + 10);
                } else {
                    setPlayer2Score((prev) => prev + 10);
                }
                setNumPairsLeft((prev)=>prev-1);
                setFlippedIndices([]); // Clear the flippedIndices
            }
        }
    }, [flippedIndices, flippedCards, shuffledCards, currentPlayer,playerNumber, numPairsLeft,switchPlayer]);

    useEffect(() => {
        // Check if all pairs are matched (total matches = shuffledCards.length / 2)
        if (numPairsLeft===0) {
            let winnerName: string;
            
            if (player1Score > player2Score) {
                winnerName = player1;
            } else if (player2Score > player1Score) {
                winnerName = player2;
            } else {
                winnerName = 'Tie'; // If scores are equal, it's a tie
            }
    
            setWinner(winnerName);  // Set the winner or tie
            setGameOver(true); // Set the game as over
        }
    }, [player1Score, player2Score, shuffledCards.length, player1, player2,numPairsLeft]);
    

    // Reset game (reset cards, scores, and current player)
    const resetGame = () => {
      // Shuffle the cards again
      const shuffled = shuffleCards([...baseCards]);
  
      // Update the state with the new shuffled cards
      setFlippedCards(new Array(shuffled.length).fill(false)); // Reset all cards to not flipped
      setFlippedIndices([]); // Clear flipped indices
      setPlayer1Score(0); // Reset player 1's score
      setPlayer2Score(0); // Reset player 2's score
      setNumPairsLeft(6);
      setCurrentPlayer(player1); // Set current player back to player 1
      setGameOver(false); // Reset the game over state
  
      // Update the shuffled cards state
      setShuffledCards(shuffled); // Ensure new shuffled cards are applied
  };
  

    const navigateToHome = () => {
        navigate('/'); // Navigates to the root URL ("/")
    };

    return (
        <div>
            {/* Player Names and Scores Container */}
            <Box
                sx={{
                    width: '300px',
                    padding: '10px 20px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    boxShadow: 3,
                    marginBottom: '20px',
                }}
            >
              {/* Player 1 */}
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
                Player 1: {player1} (Score: {player1Score})
              </Typography>
              {/* Player 2 */}
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
                Player 2: {player2} (Score: {player2Score})
              </Typography>
              {/* Player Turn */}
              <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', marginTop: '10px' }}>
                Current Turn: {currentPlayer}
              </Typography>
            </Box>

            {/* Game board container */}
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
                {shuffledCards.map((card, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <MemoryCard
                            cardLabel={card}
                            flipped={flippedCards[index]}
                            onFlip={() => handleCardFlip(index)}
                        />
                    </Box>
                ))}
            </Box>

            {/* Buttons container */}
            <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                <Button onClick={resetGame} variant="contained" color="primary">
                    Play Again
                </Button>

                <Button onClick={navigateToHome} variant="contained" color="secondary">
                    New Players
                </Button>
            </Box>

            <GameOverModal
                open={gameOver}
                winner={winner}
                onPlayAgain={resetGame}
                onNewPlayers={navigateToHome}

            />
        </div>
    );
};

export default GameBoard;
