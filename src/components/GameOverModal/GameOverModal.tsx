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
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          onNewPlayers();
        }
      }}
      PaperProps={{
        sx: {
          boxShadow: 6,  // Strong shadow for emphasis
          borderRadius: '12px',  // Rounded corners for a modern look
          padding: 3,  // Optional: adds padding inside the modal
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
        Game Over
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: winner === 'Tie' ? 'orange' : 'green' }}>
            {winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`}
          </Typography>
          {winner !== 'Tie' && (
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Click one of the options below to play again.
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={onPlayAgain}
          color="primary"
          variant="contained"
          sx={{ marginRight: 2 }}
        >
          Play Again
        </Button>
        <Button
          onClick={onNewPlayers}
          color="secondary"
          variant="contained"
        >
          New Players
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOverModal;
