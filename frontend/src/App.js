import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Services from './pages/Services';
import Contact from './pages/Contact';
import { startBackgroundAnimation } from './assets/backgroundAnimation'; // Import the animation function

function App() {
  useEffect(() => {
    // Start the background animation when the app mounts
    startBackgroundAnimation();
  }, []);

  return (
    <Router>
      <canvas id="canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}></canvas>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/services/:serviceType" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
