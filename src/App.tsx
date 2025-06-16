// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import { MaturityProvider } from './context/MaturityContext.tsx';
import DiagnosticPage2 from './pages/DiagnosticPage6.tsx'; // Import the new page
import PrioritisationPage from './pages/PrioritisationPage.tsx';

const App = () => {
  return (
    <MaturityProvider>
      <Routes>
        {/* The root path now points to our new test page */}
      //  <Route path="/" element={<DiagnosticPage2 />} /> 
        <Route path="/prioritisation" element={<PrioritisationPage />} />
      </Routes>
    </MaturityProvider>
  );
};

export default App;