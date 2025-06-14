// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import { MaturityProvider } from './context/MaturityContext.tsx';
import DiagnosticPage from './pages/DiagnosticPage.tsx';
import PrioritisationPage from './pages/PrioritisationPage.tsx';

const App = () => {
  return (
    <MaturityProvider>
      <Routes>
        <Route path="/" element={<DiagnosticPage />} />
        <Route path="/prioritisation" element={<PrioritisationPage />} />
      </Routes>
    </MaturityProvider>
  );
};

export default App;