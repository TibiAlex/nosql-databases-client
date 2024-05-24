import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import DatabasePage from './components/DatabasePage';

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:database" element={<DatabasePage />} />
      </Routes>
    </Router>
  );
};

export default App;
