import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';

interface GameOverModalProps {
  open: boolean;
  winner: string;
  onPlayAgain: () => void;
  onNewPlayers: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ open, winner, onPlayAgain, onNewPlayers }) => {
  return (
    <Dialog open={open} onClose={onNewPlayers} PaperProps={{
        sx: {
          boxShadow: 6,  // Shadow effect for the whole dialog box
          borderRadius: '8px',  // Optional: rounded corners
        }
      }}>
      <DialogTitle>Game Over</DialogTitle>
      <DialogContent>
        <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            {winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            {winner === 'Tie' ? "" : `Congratulations to ${winner}!`}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onPlayAgain} color="primary">
          Play Again
        </Button>
        <Button onClick={onNewPlayers} color="secondary">
          New Players
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOverModal;
