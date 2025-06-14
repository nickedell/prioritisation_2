// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import DiagnosticPage from './pages/DiagnosticPage.tsx';
import PrioritisationPage from './pages/PrioritisationPage.tsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DiagnosticPage />} />
      <Route path="/prioritisation" element={<PrioritisationPage />} />
    </Routes>
  );
};

export default App;