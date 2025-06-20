// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import { MaturityProvider } from './context/MaturityContext.tsx';
import TabbedDiagnosticPage from './pages/TabbedDiagnosticPage.tsx';

// A simple placeholder for the prioritisation page for now
const PrioritisationPage = () => <div>Prioritisation Page</div>;

const App = () => {
  return (
    <MaturityProvider>
      <Routes>
        <Route path="/" element={<TabbedDiagnosticPage />} /> 
        <Route path="/prioritisation" element={<PrioritisationPage />} />
      </Routes>
    </MaturityProvider>
  );
};

export default App;