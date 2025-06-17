// src/App.tsx

import React, { useState, useMemo } from 'react'; // 1. Import useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header';
import DiagnosticPage6 from './pages/DiagnosticPage6';
import PrioritisationResults from './pages/PrioritisationResults.tsx';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  // 2. Create the "memory box" to hold the active page's actions
  const [pageActions, setPageActions] = useState<{ onImport?: () => void; onExport?: () => void; }>({});

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // ... your theme settings
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* 3. Pass the actions down to the Header */}
        <Header 
          mode={mode} 
          toggleTheme={toggleTheme} 
          onImport={pageActions.onImport}
          onExport={pageActions.onExport}
        />
        <Routes>
          {/* 4. Pass the ability to SET actions down to each page */}
          <Route 
            path="/" 
            element={<DiagnosticPage6 setPageActions={setPageActions} />} 
          />
          <Route 
            path="/prioritisation" 
            element={<PrioritisationResults setPageActions={setPageActions} />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;