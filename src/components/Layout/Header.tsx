import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  currentPlayer: string;
  moveCount: number;
  matchesFound: number;
  pairsRemaining: number;
  playerOne: string;
  playerOneScore: number;
  playerTwo: string;
  playerTwoScore: number;
  onPlayAgain: () => void;
  onNavigateHome: () => void;
  onOpenRules: () => void;
  onUndoFlip: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentPlayer,
  moveCount,
  matchesFound,
  pairsRemaining,
  playerOne,
  playerOneScore,
  playerTwo,
  playerTwoScore,
  onPlayAgain,
  onNavigateHome,
  onOpenRules,
  onUndoFlip
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateHome = () => {
    handleMenuClose();
    onNavigateHome();
  };

  const handleUndoFlip = () => {
    onUndoFlip();
    handleMenuClose();
  };

  const handlePlayAgain = () => {
    handleMenuClose();
    onPlayAgain();
  };

  const handleOpenRules = () => {
    handleMenuClose();
    onOpenRules();
  };

  return (
    <AppBar position="static" sx={{ margin: 0, padding: 0 }}>
      <Toolbar sx={{ px: 2, py: 2, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        
        {/* Left section for current player's turn */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: 2,
            borderRadius: 2,
            boxShadow: 4,
            minWidth: '220px',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {currentPlayer}'s Turn
          </Typography>
        </Box>

        {/* Center section for both players' names and scores */}
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: 2,
            borderRadius: 2,
            boxShadow: 4,
            minWidth: '250px',
            justifyContent: 'space-around',
          }}
        >
          <Box textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              {playerOne}
            </Typography>
            <Typography variant="subtitle1">{playerOneScore}</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              {playerTwo}
            </Typography>
            <Typography variant="subtitle1">{playerTwoScore}</Typography>
          </Box>
        </Box>

        {/* Right section for game status and hamburger menu */}
        <Box display="flex" alignItems="center" sx={{ position: 'relative' }}>
          {/* Game status */}
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              backgroundColor: '#ffffff',
              color: '#000000',
              padding: 2,
              borderRadius: 2,
              boxShadow: 4,
              marginTop: { xs: 2, sm: 0 },
              display: { xs: 'none', sm: 'block' }, // Hide on xs screens
            }}
          >
            <Typography variant="body2"><strong>Moves:</strong> {moveCount}</Typography>
            <Typography variant="body2"><strong>Matches Found:</strong> {matchesFound}</Typography>
            <Typography variant="body2"><strong>Pairs Remaining:</strong> {pairsRemaining}</Typography>
          </Box>

          {/* Hamburger Menu */}
          <IconButton
            size="large"
            color="inherit"
            onClick={handleMenuClick}
            sx={{ ml: 2 }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Hamburger menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
      >
        <MenuItem onClick={handleNavigateHome}>Change Players/Difficulty</MenuItem>
        <MenuItem onClick={handlePlayAgain}>Play Again</MenuItem>
        <MenuItem onClick={handleOpenRules}>Rules</MenuItem>
        <MenuItem onClick={handleUndoFlip}>Undo Flip</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;


