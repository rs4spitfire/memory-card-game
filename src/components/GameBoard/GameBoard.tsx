import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MemoryCard from '../MemoryCard/MemoryCard';
import GameOverModal from '../GameOverModal/GameOverModal';

const GameBoard: React.FC = () => {
    const baseCards = [
        'Card 1', 'Card 1',
        'Card 2', 'Card 2',
        'Card 3', 'Card 3',
        'Card 4', 'Card 4',
        'Card 5', 'Card 5',
        'Card 6', 'Card 6'
    ];

    const shuffleCards = (cards: string[]) => {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];  // Swap cards
        }
        return cards;
    };

    const location = useLocation();
    const navigate = useNavigate();
    
    const { player1, player2 } = location.state || {};
    const shuffledCards = useMemo(() => shuffleCards([...baseCards]), []);

    const [player1Score, setPlayer1Score] = useState<number>(0);
    const [player2Score, setPlayer2Score] = useState<number>(0);
    const [currentPlayer, setCurrentPlayer] = useState<string>(player1);
    const [flippedCards, setFlippedCards] = useState<boolean[]>(new Array(shuffledCards.length).fill(false));
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>('');



    // Switch the current player
    const switchPlayer = () => {
        setCurrentPlayer((prevPlayer) => (prevPlayer === player1 ? player2 : player1));
    };

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
                // Cards match, increment the current player's score
                if (currentPlayer === player1) {
                    setPlayer1Score((prev) => prev + 1);
                } else {
                    setPlayer2Score((prev) => prev + 1);
                }
                setFlippedIndices([]); // Clear the flippedIndices
            }
        }
    }, [flippedIndices, flippedCards, shuffledCards, currentPlayer]);

    useEffect(() => {
        // Check if all pairs are matched (total matches = shuffledCards.length / 2)
        if (player1Score + player2Score === shuffledCards.length / 2) {
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
    }, [player1Score, player2Score, shuffledCards.length, player1, player2]);
    

    // Reset game (reset cards, scores, and current player)
    const resetGame = () => {
        setFlippedCards(new Array(shuffledCards.length).fill(false)); // Reset all cards to not flipped
        setFlippedIndices([]); // Clear flipped indices
        setPlayer1Score(0); // Reset player 1's score
        setPlayer2Score(0); // Reset player 2's score
        setCurrentPlayer(player1); // Set current player back to player 1
        setGameOver(false); // Reset the game over state
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
                {/* Player 1 Name and Score */}
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold', marginBottom: '10px' }}>
                    Score for {player1}: {player1Score}
                </Typography>

                {/* Player 2 Name and Score */}
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
                    Score for {player2}: {player2Score}
                </Typography>

                {/* Current Player's Turn */}
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold', marginBottom: '10px' }}>
                    {currentPlayer}'s Turn
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
