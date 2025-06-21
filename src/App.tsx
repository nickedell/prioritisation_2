// src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MaturityProvider } from './context/MaturityContext';
import TabbedDiagnosticPage from './pages/TabbedDiagnosticPage';
import PrioritisationPage from './pages/PrioritisationPage'; // Assuming you have this file
import Header from './components/Header';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// An interface to define the shape of our page configuration
export interface PageConfig {
  title: string;
  onImport?: () => void;
  onExport?: () => void;
}

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  // This state will hold the config for the currently visible page
  const [pageConfig, setPageConfig] = useState<PageConfig>({ title: 'Loading...' });

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#1F2937' : '#3B82F6', // Dark grey/blue theme
      },
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MaturityProvider>
        <Router>
          {/* The single global Header reads its config from the App's state */}
          <Header
            title={pageConfig.title}
            mode={mode}
            toggleTheme={toggleTheme}
            onImport={pageConfig.onImport}
            onExport={pageConfig.onExport}
          />
          <Routes>
            {/* Each page is given the function to set the header configuration */}
            <Route path="/" element={<TabbedDiagnosticPage setPageConfig={setPageConfig} />} />
            <Route path="/prioritisation" element={<PrioritisationPage setPageConfig={setPageConfig} />} />
          </Routes>
        </Router>
      </MaturityProvider>
    </ThemeProvider>
  );
}

export default App;