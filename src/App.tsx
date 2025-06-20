// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MaturityProvider } from './context/MaturityContext';
import DiagnosticPage6 from './pages/DiagnosticPage6';

function App() {
  return (
    // The MaturityProvider wraps your pages, making the context available
    <MaturityProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DiagnosticPage6 />} />
          {/* Add other routes here later as needed */}
        </Routes>
      </Router>
    </MaturityProvider>
  );
}

export default App;