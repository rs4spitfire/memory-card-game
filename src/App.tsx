import React from 'react';
import Layout from './components/Layout/Layout';
import GameBoard from './components/GameBoard/GameBoard';

const App: React.FC = () => {
  return (
    <Layout>
      <GameBoard />
    </Layout>
  );
};

export default App;
