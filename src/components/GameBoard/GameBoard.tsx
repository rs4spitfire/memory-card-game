import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import MemoryCard from '../MemoryCard/MemoryCard';
import GameOverModal from '../GameOverModal/GameOverModal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ResetMessageModal from '../ResetMessageModal/ResetMessageModal';
import RulesModal from '../RulesModal/RulesModal';
import PlayerCard from '../PlayerCard/PlayerCard';

const GameBoard: React.FC = () => {
  const location = useLocation();
  const { difficulty, player1, player2 } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!player1 || !player2 || !difficulty) {
      navigate('/', { replace: true });
    }
  }, [player1, player2, difficulty, navigate]);

  const [matchedCards, setMatchedCards] = useState<string[]>([]);

  const baseCards = useMemo(() => {
    switch (difficulty) {
      case 'medium':
        return [
          'pokemon_1', 'pokemon_1', 'pokemon_2', 'pokemon_2', 'pokemon_3', 'pokemon_3', 
          'pokemon_4', 'pokemon_4', 'pokemon_5', 'pokemon_5', 'pokemon_6', 'pokemon_6', 
          'pokemon_7', 'pokemon_7', 'pokemon_8', 'pokemon_8'
        ];
      case 'hard':
        return [
          'pokemon_1', 'pokemon_1', 'pokemon_2', 'pokemon_2', 'pokemon_3', 'pokemon_3',
          'pokemon_4', 'pokemon_4', 'pokemon_5', 'pokemon_5', 'pokemon_6', 'pokemon_6', 
          'pokemon_7', 'pokemon_7', 'pokemon_8', 'pokemon_8', 'pokemon_9', 'pokemon_9', 
          'pokemon_10', 'pokemon_10'
        ];
      default:
        return [
          'pokemon_1', 'pokemon_1', 'pokemon_2', 'pokemon_2', 'pokemon_3', 'pokemon_3', 
          'pokemon_4', 'pokemon_4', 'pokemon_5', 'pokemon_5', 'pokemon_6', 'pokemon_6'
        ];
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
  const [previousFlippedCard, setPreviousFlippedCard] = useState<number | null>(null);
  const [lastFlippedIndex, setLastFlippedIndex] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState(0);

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
    // Ignore if already flipped or matched
    if (flippedCards[index] || flippedIndices.length === 2) return;
  
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = true;
  
    setFlippedCards(newFlippedCards);
    setFlippedIndices((prev) => [...prev, index]);
  
    if (flippedIndices.length === 0) {
      setLastFlippedIndex(index); // Save the single flip
    } else {
      setLastFlippedIndex(null); // Clear if two cards are now flipped
    }
  };

useEffect(() => {
  if (flippedIndices.length === 2) {
    setMoveCount((prev) => prev + 1);
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
      setMatchedCards((prev) => [...prev, shuffledCards[firstIndex]]);
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
    navigate('/updated');
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
        <Box sx={{ display: 'flex', gap: 2, marginTop: 2, marginLeft: 2 }}>
        <Button onClick={navigateToHome} variant="contained" color="primary">
            Change Players/Difficulty
          </Button>
          <Button onClick={handlePlayAgainClick} variant="contained" color="primary">
            Play Again
          </Button>

          <Button 
          variant="contained"
          color="primary" 
          onClick={handleOpenRules} 
          sx={{ minWidth: 120 }}
        >
          Rules
        </Button>
        <Button
  onClick={() => {
    if (lastFlippedIndex !== null && flippedCards[lastFlippedIndex]) {
      const newFlippedCards = [...flippedCards];
      newFlippedCards[lastFlippedIndex] = false;
      setFlippedCards(newFlippedCards);
      setFlippedIndices([]);
      setLastFlippedIndex(null);
    }
  }}
  variant="contained"
  color="secondary"
>
  Undo Flip
</Button>                     
        </Box>
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, padding: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <PlayerCard name={player1} score={player1Score} isActive={currentPlayer === player1} />
          <PlayerCard name={player2} score={player2Score} isActive={currentPlayer === player2} />
          <Box
  sx={{
    padding: 2,
    border: '1px solid #ccc',
    borderRadius: 2,
    backgroundColor: '#fff',
    boxShadow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    width: '170px'
  }}
>
  <div><strong>Current Turn:</strong> {currentPlayer}</div>
  <div><strong>Moves:</strong> {moveCount}</div>
  <div><strong>Matches Found:</strong> {(shuffledCards.length / 2) - numPairsLeft}</div>
  <div><strong>Pairs Remaining:</strong> {numPairsLeft}</div>
</Box>
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
              <MemoryCard
                cardLabel={card}
                flipped={flippedCards[index]}
                onFlip={() => handleCardFlip(index)}
                cardSize={getCardSize()}
                visible
              />
            </Box>
          ))}
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

export default GameBoard;
