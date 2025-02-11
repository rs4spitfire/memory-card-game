import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import GameBoard from './components/GameBoard/GameBoard';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameBoard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

