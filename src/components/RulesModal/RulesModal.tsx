import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Divider,
  Box
} from '@mui/material';

interface RulesModalProps {
  open: boolean;
  onClose: () => void;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
    {children}
  </Typography>
);

const RulesModal: React.FC<RulesModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Memory Game Rules</DialogTitle>
      <DialogContent>
        <SectionTitle>🎯 Objective</SectionTitle>
        <Typography paragraph>
          Match all the pairs of identical cards. The player with the most matches at the end wins!
        </Typography>

        <Divider sx={{ my: 1 }} />

        <SectionTitle>🧩 Setup</SectionTitle>
        <Typography paragraph><strong>Cards:</strong> A shuffled deck with matching pairs is laid out face down in a grid.</Typography>
        <Typography paragraph><strong>Players:</strong> 2 or more players take turns flipping over cards.</Typography>

        <Divider sx={{ my: 1 }} />

        <SectionTitle>🎮 How to Play</SectionTitle>
        <Typography paragraph>On each turn, a player flips two cards:</Typography>
        <ul>
          <li>If the cards match, the player keeps the pair and takes another turn.</li>
          <li>If they don’t match, the cards are flipped back, and the next player takes their turn.</li>
        </ul>

        <Divider sx={{ my: 1 }} />

        <SectionTitle>🧠 Memory</SectionTitle>
        <Typography paragraph>
          Pay close attention to card positions. Remembering previous flips will help you find matches and win!
        </Typography>

        <Divider sx={{ my: 1 }} />

        <SectionTitle>🏆 Winning</SectionTitle>
        <Typography paragraph>
          The game ends when all pairs are matched. The player with the most matched pairs wins.
        </Typography>

        <Divider sx={{ my: 1 }} />

        <SectionTitle>⚙️ Variations</SectionTitle>
        <ul>
          <li><strong>Difficulty:</strong> Change the number of cards or grid size.</li>
          <li><strong>Solo Mode:</strong> Try to match all pairs in the fewest moves.</li>
          <li><strong>Time Challenge:</strong> Add a timer per turn for extra tension.</li>
        </ul>

        <Divider sx={{ my: 1 }} />

        <SectionTitle>🧠 Strategy Tips</SectionTitle>
        <ul>
          <li>Remember what your opponent flips!</li>
          <li>Pay attention to positions.</li>
          <li>Take your time and stay sharp.</li>
        </ul>

        <Divider sx={{ my: 1 }} />

        <Box mt={3}>
          <Typography align="center" fontStyle="italic">
            Have fun and sharpen your memory while playing!
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Got It!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RulesModal;