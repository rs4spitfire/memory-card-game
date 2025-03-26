import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import UpdatedMemoryCard from '../UpdatedMemoryCard/UpdatedMemoryCard';
import GameOverModal from '../GameOverModal/GameOverModal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ResetMessageModal from '../ResetMessageModal/ResetMessageModal';
import RulesModal from '../RulesModal/RulesModal';
import UpdatedPlayerCard from '../UpdatedPlayerCard/UpdatedPlayerCard';

const UpdatedGameBoard: React.FC = () => {
  const location = useLocation();
  const { difficulty, player1, player2 } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!player1 || !player2 || !difficulty) {
      navigate('/', { replace: true });
    }
  }, [player1, player2, difficulty, navigate]);

  const baseCards = useMemo(() => {
    switch (difficulty) {
      case 'medium':
        return ['Card 1', 'Card 1', 'Card 2', 'Card 2', 'Card 3', 'Card 3', 'Card 4', 'Card 4', 'Card 5', 'Card 5', 'Card 6', 'Card 6', 'Card 7', 'Card 7', 'Card 8', 'Card 8'];
      case 'hard':
        return ['Card 1', 'Card 1', 'Card 2', 'Card 2', 'Card 3', 'Card 3', 'Card 4', 'Card 4', 'Card 5', 'Card 5', 'Card 6', 'Card 6', 'Card 7', 'Card 7', 'Card 8', 'Card 8', 'Card 9', 'Card 9', 'Card 10', 'Card 10'];
      default:
        return ['Card 1', 'Card 1', 'Card 2', 'Card 2', 'Card 3', 'Card 3', 'Card 4', 'Card 4', 'Card 5', 'Card 5', 'Card 6', 'Card 6'];
    }
  }, [difficulty]);

  const shuffleCards = (cards: string[]) => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [shuffledCards, setShuffledCards] = useState<string[]>(shuffleCards([...baseCards]));
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState<string>(player1);
  const [flippedCards, setFlippedCards] = useState<boolean[]>(new Array(shuffledCards.length).fill(false));
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [numPairsLeft, setNumPairsLeft] = useState<number>(shuffledCards.length / 2);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('');
  const [playerNumber, setPlayerNumber] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [openRules, setOpenRules] = useState(false);

  const handlePlayAgainClick = () => {
    setShowConfirmation(true);
  };

 

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleOpenRules = () => {
    setOpenRules(true);
  };

  const handleCloseRules = () => {
    setOpenRules(false);
  };

  const handleConfirmReset = () => {
    setShowConfirmation(false); // Close the modal
    resetGame(); // Reset the game logic
    setShowResetMessage(true); // Show the "Game has been reset" message
    setTimeout(() => {
      setShowResetMessage(false); // Hide after 500 ms
    }, 1000);
  };

  const switchPlayer = useCallback(() => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === player1 ? player2 : player1));
    setPlayerNumber((prevPlayerNumber) => (prevPlayerNumber === 1 ? 2 : 1));
  }, [player1, player2]);

  const handleCardFlip = (index: number) => {
    if (flippedIndices.length === 2) return;

    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);

    setFlippedIndices((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;

      if (shuffledCards[firstIndex] !== shuffledCards[secondIndex]) {
        setTimeout(() => {
          const resetFlippedCards = [...flippedCards];
          resetFlippedCards[firstIndex] = false;
          resetFlippedCards[secondIndex] = false;
          setFlippedCards(resetFlippedCards);
          setFlippedIndices([]);
          switchPlayer();
        }, 500);
      } else {
        if (playerNumber === 1) {
          setPlayer1Score((prev) => prev + 10);
        } else {
          setPlayer2Score((prev) => prev + 10);
        }
        setNumPairsLeft((prev) => prev - 1);
        setFlippedIndices([]);
      }
    }
  }, [flippedIndices, flippedCards, shuffledCards, currentPlayer, playerNumber, numPairsLeft, switchPlayer]);

  useEffect(() => {
    if (numPairsLeft === 0) {
      let winnerName: string;
      if (player1Score > player2Score) {
        winnerName = player1;
      } else if (player2Score > player1Score) {
        winnerName = player2;
      } else {
        winnerName = 'Tie';
      }
      setWinner(winnerName);
      setGameOver(true);
    }
  }, [player1Score, player2Score, shuffledCards.length, player1, player2, numPairsLeft]);

  const resetGame = () => {
    const shuffled = shuffleCards([...baseCards]);
    setFlippedCards(new Array(shuffled.length).fill(false));
    setFlippedIndices([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setNumPairsLeft(shuffled.length / 2);
    setCurrentPlayer(player1);
    setGameOver(false);
    setShuffledCards(shuffled);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const getCardSize = () => {
    switch (difficulty) {
      case 'medium':
        return '90px';
      case 'hard':
        return '80px';
      default:
        return '100px';
    }
  };

  return (
    <div>
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, padding: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <UpdatedPlayerCard name={player1} score={player1Score} isActive={currentPlayer === player1} />
          <UpdatedPlayerCard name={player2} score={player2Score} isActive={currentPlayer === player2} />
        </Box>

        <Box
          sx={{
            width: '700px',
            height: '500px',
            display: 'grid',
            gridTemplateColumns: `repeat(${difficulty === 'easy' ? 4 : difficulty === 'medium' ? 4 : 5}, 1fr)`,
            gridTemplateRows: `repeat(${difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 4}, 1fr)`,
            gap: 2,
            backgroundColor: '#f5f5f5',
            boxShadow: 3,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative', // Make sure the gameboard has relative positioning
          }}
        >
          {shuffledCards.map((card, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <UpdatedMemoryCard
                cardLabel={card}
                flipped={flippedCards[index]}
                onFlip={() => handleCardFlip(index)}
                cardSize={getCardSize()}
              />
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
          <Button onClick={handlePlayAgainClick} variant="contained" color="primary">
            Play Again
          </Button>
          <Button onClick={navigateToHome} variant="contained" color="primary">
            New Players
          </Button>
          <Button 
          variant="contained"
          color="primary" 
          onClick={handleOpenRules} 
          sx={{ minWidth: 120 }}
        >
          Rules
        </Button>
        </Box>
      </Box>

      <GameOverModal open={gameOver} winner={winner} onPlayAgain={resetGame} onNewPlayers={navigateToHome} />

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={showConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmReset}
        message="Are you sure you want to start over?"
      />

    <ResetMessageModal open={showResetMessage} message="Game has been reset" onClose={() => setShowResetMessage(false)} />
    <RulesModal open={openRules} onClose={handleCloseRules} />
    </div>

    
  );
};

export default UpdatedGameBoard;
