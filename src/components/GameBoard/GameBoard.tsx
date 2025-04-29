import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import MemoryCard from '../MemoryCard/MemoryCard';
import GameOverModal from '../GameOverModal/GameOverModal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ResetMessageModal from '../ResetMessageModal/ResetMessageModal';
import RulesModal from '../RulesModal/RulesModal';
//import PlayerCard from '../PlayerCard/PlayerCard';
import Header from '../Layout/Header';

const GameBoard: React.FC = () => {
  const location = useLocation();
  const { difficulty, player1, player2 } = location.state || {};
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!player1 || !player2 || !difficulty) {
      navigate('/', { replace: true });
    }
  }, [player1, player2, difficulty, navigate]);

  const [, setMatchedCards] = useState<string[]>([]);

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
  //const [previousFlippedCard, setPreviousFlippedCard] = useState<number | null>(null);
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


  const handleUndoFlip = ()=>{  
    if (lastFlippedIndex !== null && flippedCards[lastFlippedIndex]) {
      const newFlippedCards = [...flippedCards];
      newFlippedCards[lastFlippedIndex] = false;
      setFlippedCards(newFlippedCards);
      setFlippedIndices([]);
      setLastFlippedIndex(null);
    }
  }

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
        return '120px';
      case 'hard':
        return '110px';
      default:
        return '130px';
    }
  };

  return (
    <div>
    <Header
  currentPlayer={currentPlayer}
  playerOneScore={player1Score}
  playerTwoScore={player2Score}
  playerOne={player1}
  playerTwo={player2}
  moveCount={moveCount}
  matchesFound={(shuffledCards.length / 2) - numPairsLeft}
  pairsRemaining={numPairsLeft}
  onPlayAgain={handlePlayAgainClick}
  onNavigateHome={navigateToHome}
  onOpenRules={handleOpenRules}
  onUndoFlip={handleUndoFlip}
/>
       
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, mt: 2}}>
        

        <Box
          sx={{
            width: '900px',
            height: '700px',
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
