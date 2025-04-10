import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UpdatedLayout from './components/UpdatedLayout/UpdatedLayout';
import UpdatedGameBoard from './components/UpdatedGameBoard/UpdatedGameBoard'
import UpdatedHome from './components/UpdatedHome/UpdatedHome'
import Home from './components/Home/Home';
import GameBoard from './components/GameBoard/GameBoard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Home route with default Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />

        {/* Game route with GameBoardLayout */}
        <Route path="/game" element={<Layout><GameBoard /></Layout>} />

        <Route path="/updated" element={<UpdatedLayout><UpdatedHome /></UpdatedLayout>} />
        <Route path="/updated/game" element={<UpdatedLayout><UpdatedGameBoard /></UpdatedLayout>} />
      </Routes>
    </Router>
  );
};

export default App;

