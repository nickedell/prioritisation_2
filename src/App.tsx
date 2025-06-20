// src/App.tsx

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MaturityProvider } from './context/MaturityContext.tsx';
import TabbedDiagnosticPage from './pages/TabbedDiagnosticPage.tsx';
import PrioritisationPage from './pages/PrioritisationPage.tsx';
import Header from './components/Header.tsx';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Interface for the header configuration
export interface PageConfig {
  title: string;
  onImport?: () => void;
  onExport?: () => void;
}

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  // State to hold the current page's header configuration
  const [pageConfig, setPageConfig] = useState<PageConfig>({ title: 'Loading...' });

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#1E3A8A' : '#3B82F6', // Example blue colors
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
        {/* The single global Header */}
        <Header
          title={pageConfig.title}
          mode={mode}
          toggleTheme={toggleTheme}
          onImport={pageConfig.onImport}
          onExport={pageConfig.onExport}
        />
        <Routes>
          {/* We pass the 'setPageConfig' function to each page */}
          <Route path="/" element={<TabbedDiagnosticPage setPageConfig={setPageConfig} />} />
          <Route path="/prioritisation" element={<PrioritisationPage setPageConfig={setPageConfig} />} />
        </Routes>
      </MaturityProvider>
    </ThemeProvider>
  );
}

export default App;