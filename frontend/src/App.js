import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import QuoteBuilder from './pages/QuoteBuilder';
import { startBackgroundAnimation } from './assets/backgroundAnimation';

function App() {
  useEffect(() => {
    startBackgroundAnimation();
  }, []);

  return (
    <Router>
      <canvas id="canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} aria-hidden="true"></canvas>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/build" element={<QuoteBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
