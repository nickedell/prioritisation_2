// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MaturityProvider } from './context/MaturityContext';
import DiagnosticPage6 from './pages/DiagnosticPage6';
import PrioritisationResults from './components/PrioritisationResults'; // Assuming this is the correct path

function App() {
  return (
    // The MaturityProvider wraps your entire application
    <MaturityProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DiagnosticPage6 />} />
          {/* We will fix the Prioritisation page in a later step */}
          <Route path="/prioritisation" element={<div>Prioritisation Page Placeholder</div>} />
        </Routes>
      </Router>
    </MaturityProvider>
  );
}

export default App;