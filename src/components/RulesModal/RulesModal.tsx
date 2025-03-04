// src/components/RulesModal.tsx
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';



interface RulesModalProps {
  open: boolean;
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ open, onClose }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Game Rules</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Objective:</Typography>
          <Typography>
            The goal of the game is to find and match pairs of identical cards. The player who matches the most pairs wins the game.
          </Typography>
          
          <Typography variant="h6" sx={{ mt: 2 }}>Setup:</Typography>
          <Typography>
            <strong>Deck of Cards:</strong> A set of cards is used, with each card having a matching pair (e.g., two cards with the same image, number, or word).
          </Typography>
          <Typography>
            <strong>Shuffling:</strong> The cards are shuffled and placed face down in a grid pattern (usually 4x4, 5x5, etc., depending on the difficulty level and number of players).
          </Typography>
          <Typography>
            <strong>Turn Order:</strong> The game is typically played with two players, but more can be involved. Players take turns flipping over two cards at a time.
          </Typography>
  
          <Typography variant="h6" sx={{ mt: 2 }}>Game Play:</Typography>
          <Typography>
            <strong>Player's Turn:</strong>
            On their turn, the player flips over two cards. They can flip any two cards on the grid, revealing their images.
          </Typography>
          <Typography>
            If the two cards match (i.e., they have the same image, number, etc.), the player keeps the matched pair and gets another turn.
          </Typography>
          <Typography>
            If the two cards do not match, they are flipped back over face down, and the player's turn ends.
          </Typography>
  
          <Typography variant="h6" sx={{ mt: 2 }}>Memory:</Typography>
          <Typography>
            Players should try to remember the positions of the cards they've seen, especially the ones they haven't yet matched, as this will help them make matches on future turns.
          </Typography>
  
          <Typography variant="h6" sx={{ mt: 2 }}>Winning:</Typography>
          <Typography>
            The game continues until all pairs are matched. The player who has collected the most pairs at the end of the game is the winner.
          </Typography>
  
          <Typography variant="h6" sx={{ mt: 2 }}>Variations:</Typography>
          <Typography>
            <strong>Difficulty Levels:</strong> You can adjust the difficulty by increasing the number of cards and pairs, making it harder to remember card locations.
          </Typography>
          <Typography>
            <strong>Single Player:</strong> The game can also be played solo, where the player tries to match all pairs in the shortest amount of time.
          </Typography>
          <Typography>
            <strong>Time Challenge:</strong> You could add a time limit for each turn to make it more challenging.
          </Typography>
  
          <Typography variant="h6" sx={{ mt: 2 }}>Strategy Tips:</Typography>
          <Typography>
            <strong>Remember Card Locations:</strong> A key part of the game is memorizing the locations of cards as you flip them.
          </Typography>
          <Typography>
            <strong>Think Ahead:</strong> Try to remember pairs your opponent flips over to use that information to your advantage.
          </Typography>
          <Typography>
            <strong>Stay Focused:</strong> The game is all about memory, so stay focused and pay attention to card locations.
          </Typography>
  
          <Typography variant="h6" sx={{ mt: 2 }}>Enjoy the game!</Typography>
          <Typography>
            It's a great game for improving memory and concentration, and it's fun for all ages!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    );
  };
  

export default RulesModal;
